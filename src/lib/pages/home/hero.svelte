<script>
	import { onMount } from 'svelte';
	import i18n from '$lib/i18n';
	import heroI18n from './hero.i18n';
	import BreakingNews from './news.svelte';

	let { lang } = $props();
	/** @type {import('svelte').Component | null} */
	let HeroAnimation = $state(null);

	onMount(() => {
		const load = async () => {
			HeroAnimation = (await import('./hero-animation.svelte')).default;
		};
		if ('requestIdleCallback' in window) {
			requestIdleCallback(load);
		} else {
			setTimeout(load, 200);
		}
	});
</script>

<div id="large-header">
	{#if HeroAnimation}
		<HeroAnimation />
	{/if}
</div>
<div class="hero">
	<div class="bg-overlay">
		<div class="content-wrapper">
			<div class="content">
				<picture>
					<source srcset="/images/hero/blackcoin-logo.webp" type="image/webp" fetchpriority="high" />
					<img
						src="/images/hero/blackcoin-logo.png"
						alt="Blackcoin coin logo"
						width="150"
						height="150"
						fetchpriority="high"
					/>
				</picture>

				<h1 class="title">
					{i18n(heroI18n, 'blackcoin', lang)}
				</h1>
				<hr />
				<h2 class="subtitle">{i18n(heroI18n, 'since2014', lang)}</h2>
			</div>
			<br />
			<BreakingNews {lang} />
			<br />
		</div>
		<a href="#about" class="scroller">
			<svg
				class="mouse-icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 30 50"
				width="30"
				height="50"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<!-- mouse body -->
				<rect x="1.5" y="1.5" width="27" height="47" rx="13.5" stroke-width="2" />
				<!-- scroll wheel track -->
				<line x1="15" y1="2" x2="15" y2="17" stroke-width="1.5" opacity="0.4" />
				<!-- animated scroll dot -->
				<circle class="scroll-dot" cx="15" cy="13" r="3.5" fill="currentColor" stroke="none" />
			</svg>
			<span class="scroller-text">scroll down</span>
		</a>
	</div>
</div>

<style>
	hr {
		margin: 1.5rem;
		color: transparent;
		border: none;
	}
	.hero {
		background: url('/images/hero/tri.webp');
		background-size: cover;
		background-position: 50%;
		background-attachment: fixed;
	}
	.bg-overlay {
		position: relative;
		background: var(--hero-overlay);
		overflow: hidden;
		height: 100vh;
	}
	.scroller {
		display: inline-block;
		position: absolute;
		bottom: 15px;
		left: 0;
		right: 0;
		width: 120px;
		margin: 0 auto;
		text-align: center;
		color: var(--hero-scroller);
		text-decoration: none;
		transition: color 0.3s;
	}
	.scroller:hover {
		color: var(--hero-scroller-hover);
	}
	.mouse-icon {
		display: block;
		margin: 0 auto;
	}
	.scroll-dot {
		animation: scroll-drop 1.6s ease-in-out infinite;
	}
	@keyframes scroll-drop {
		0% {
			transform: translateY(0);
			opacity: 1;
		}
		60% {
			transform: translateY(8px);
			opacity: 0;
		}
		61% {
			transform: translateY(0);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
	.scroller .scroller-text {
		display: block;
		font-size: 10px;
		letter-spacing: 2.5px;
		text-transform: uppercase;
		color: var(--text-hi);
		transform: translateY(5px);
		opacity: 0;
		transition: all 0.3s;
	}
	.scroller:hover .scroller-text {
		transform: translateY(-10px);
		opacity: 1;
	}
	.hero .content-wrapper .content {
		text-align: center;
		padding-top: 4rem;
	}
	.hero {
		color: var(--text-hi);
	}
	img {
		padding-top: 15%;
		height: auto;
	}
	#large-header {
		position: absolute;
		margin: 0 auto;
	}
	.title {
		margin-bottom: 0;
		letter-spacing: 10px;
	}
	.subtitle {
		margin: 0;
		letter-spacing: 10px;
		font-size: 0.75rem;
	}

	.scroller {
		display: none;
	}

	@media (min-width: 700px) {
		img {
			padding-top: 5%;
		}
		.subtitle {
			font-size: 1.3rem;
		}
		.scroller {
			display: inline-block;
		}
	}
	@media (min-width: 1440px) {
		img {
			padding-top: 8%;
			width: 18%;
		}
	}
</style>
