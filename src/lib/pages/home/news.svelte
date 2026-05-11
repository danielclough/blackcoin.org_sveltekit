<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import newsI18n from './news.i18n';
	import news from './news';
	import i18n from '$lib/i18n';

	let { lang } = $props();

	let i = $state(0);
	let direction = $state(1);
	let bn = $derived(news[i % news.length]);

	let containerEl: HTMLDivElement | null = $state(null);
	let interval: ReturnType<typeof setInterval> | null = null;
	let observer: IntersectionObserver | null = null;

	function startInterval() {
		if (interval !== null) return;
		interval = setInterval(() => {
			direction = 1;
			i = ((i % news.length) + 1) % news.length;
		}, 5000);
	}

	function prev() {
		direction = -1;
		i = ((i % news.length) - 1 + news.length) % news.length;
		stopInterval();
		startInterval();
	}

	function next() {
		direction = 1;
		i = ((i % news.length) + 1) % news.length;
		stopInterval();
		startInterval();
	}

	function stopInterval() {
		if (interval === null) return;
		clearInterval(interval);
		interval = null;
	}

	onMount(() => {
		if (!containerEl) return;
		observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					startInterval();
				} else {
					stopInterval();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(containerEl);
	});

	onDestroy(() => {
		stopInterval();
		observer?.disconnect();
	});
</script>

<br />
<div class="news-container" bind:this={containerEl}>
	<br />
	<div class="title">
		<h2>{i18n(newsI18n, 'latest_news', lang)}</h2>
	</div>
	<div class="news-row">
		<button class="nav-btn" onclick={prev} aria-label="Previous news">&#8249;</button>
		<div class="newsBox">
			{#key bn}
				<a href={bn.url} class="news-link" in:fly={{ x: direction * 16, duration: 280 }}>
					<span class="date">{bn.date}</span>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<p class="content">{@html i18n(bn, 'news', lang)}</p>
				</a>
			{/key}
		</div>
		<button class="nav-btn" onclick={next} aria-label="Next news">&#8250;</button>
	</div>
	<br />
</div>
<br />

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.1rem 0 0.3rem;
	}

	.title::before {
		content: '';
		display: inline-block;
		width: 7px;
		height: 7px;
		background: var(--news-accent);
		border-radius: 50%;
		flex-shrink: 0;
		animation: pulse-dot 2s ease-in-out infinite;
	}

	@keyframes pulse-dot {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(0.75);
		}
	}

	h2 {
		font-size: clamp(0.7rem, 1.2vw, 1rem);
		letter-spacing: 3px;
		text-transform: uppercase;
		line-height: 1.3;
	}

	.news-container {
		width: 90%;
		max-width: 960px;
		margin: 0 auto;
	}

	.news-row {
		display: flex;
		align-items: stretch;
	}

	.nav-btn {
		flex-shrink: 0;
		background: var(--news-bg);
		border: solid 1px var(--news-border);
		color: var(--news-content);
		font-size: 1.1rem;
		line-height: 1;
		padding: 0 0.75rem;
		min-width: 44px;
		min-height: 44px;
		cursor: pointer;
		transition:
			color 0.15s,
			background 0.15s;
	}

	.nav-btn:hover {
		color: var(--news-accent);
		background: var(--news-border);
	}

	.newsBox {
		flex: 1;
		overflow: hidden;
		background: var(--news-bg);
		border-top: solid 1px var(--news-border);
		border-bottom: solid 1px var(--news-border);
	}

	.news-link {
		display: block;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		min-height: 44px;
	}

	.date {
		float: left;
		margin: 0;
		margin-right: 0.5rem;
		padding: 0.2rem 0.6rem;
		background: var(--news-accent);
		color: #fff;
		font-size: 0.8rem;
		line-height: 1.4;
		letter-spacing: 0.5px;
		white-space: nowrap;
	}

	.content {
		display: block;
		margin: 0;
		padding: 0.5rem 0.6rem;
		color: var(--news-content);
		font-size: 0.8rem;
		line-height: 1.4;
		white-space: normal;
		word-break: break-word;
	}

	.content :global(strong) {
	}

	@media (min-width: 700px) {
		.newsBox {
			display: flex;
			align-items: stretch;
		}
		.news-link {
			display: flex;
			align-items: stretch;
			overflow: hidden;
			width: 100%;
		}
		.date {
			float: none;
			display: flex;
			align-items: center;
			padding: 0 0.75rem;
			font-size: clamp(0.65rem, 1vw, 0.85rem);
			line-height: normal;
		}
		.content {
			flex: 1;
			padding: 0.4rem 1rem;
			font-size: clamp(0.75rem, 1.2vw, 0.95rem);
			white-space: normal;
			line-height: normal;
		}
	}
</style>
