<script>
	import TiltCard from '$lib/components/common/tilt-card.svelte';
	import SpecialText from '$lib/components/common/special-text.svelte';
	import i18n from '$lib/i18n';
	import downloadsI18n from './downloads.i18n';
	import downloadGroups from './download-groups';

	let { lang } = $props();
</script>

<section id="services">
	<header>
		<h2 class="golden" id="downloads">
			<SpecialText text={i18n(downloadsI18n, 'downloads', lang)} inView={true} speed={18} />
		</h2>
		<p class="subheading">{i18n(downloadsI18n, 'official_files', lang)}</p>
	</header>

	<div class="card-grid">
		{#each downloadGroups as dl, idx (dl.title)}
			<TiltCard tiltLimit={10} scale={1.03}>
				<article class="card" style="--stagger: {idx * 90}ms">
					<div class="card-media">
						{#if dl.links[0].img}
							<picture>
								{#if !dl.links[0].img.endsWith('.svg')}
									<source srcset={dl.links[0].img.replace(/\.[^.]+$/, '.webp')} type="image/webp" />
								{/if}
								<img
									src={dl.links[0].img}
									alt={dl.links[0].alt ?? ''}
									height={dl.links[0].height}
									width={dl.links[0].width}
									loading="lazy"
								/>
							</picture>
						{:else}
							<span class="icon-placeholder" aria-hidden="true">⌗</span>
						{/if}
					</div>

					<div class="card-body">
						<h3>{i18n(downloadsI18n, dl.title, lang)}</h3>
						{#if dl.subtitle}
							<p class="subtitle">{i18n(downloadsI18n, dl.subtitle, lang)}</p>
						{/if}
					</div>

					<div class="card-links">
						{#each dl.links as link (link.url)}
							<a href={link.url} class="link-row" target="_blank" rel="noopener noreferrer">
								<span>{link.label}</span>
								<span class="arrow" aria-hidden="true">→</span>
							</a>
						{/each}
					</div>
				</article>
			</TiltCard>
		{/each}
	</div>
</section>

<style>
	section {
		background: var(--ink-1);
		padding: 4rem 1rem;
		border-top: 1px solid var(--gold-08);
	}

	header {
		max-width: min(90%, 1400px);
		margin: 0 auto 3rem;
		text-align: center;

		&::after {
			content: '';
			display: block;
			width: 48px;
			height: 1px;
			background: linear-gradient(to right, transparent, var(--gold), transparent);
			margin: 0.75rem auto 0;
		}
	}

	.subheading {
		color: var(--card-label);
		font-size: 0.7rem;
		letter-spacing: 3px;
		text-transform: uppercase;
		margin: 0;
	}

	.card-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		max-width: min(90%, 1200px);
		margin: 0 auto;
		justify-content: center;
	}

	@media (min-width: 600px) {
		.card-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 960px) {
		.card-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.card {
		display: flex;
		flex-direction: column;
		height: 100%;
		background:
			radial-gradient(
				ellipse at top right,
				color-mix(in oklch, var(--gold) 6%, transparent) 0%,
				transparent 55%
			),
			linear-gradient(160deg, var(--card-bg-base) 0%, var(--ink-2) 100%);
		border: 1px solid var(--card-border);
		border-left: 2px solid var(--gold-40);
		border-radius: 8px;
		overflow: hidden;
		box-shadow:
			inset 0 1px 0 var(--card-shadow-in),
			0 2px 12px var(--card-shadow-out);

		animation: cardReveal both linear;
		animation-timeline: view();
		animation-range: entry 0% cover 35%;
		animation-delay: calc(var(--stagger, 0) * 1ms);

		transition:
			border-color var(--t-fast) var(--ease-smooth),
			border-left-color var(--t-fast) var(--ease-smooth),
			box-shadow var(--t-normal) var(--ease-smooth);
	}

	@keyframes cardReveal {
		from {
			opacity: 0;
			transform: translateY(24px) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	:global(.tilt-wrap:hover) .card,
	:global(.tilt-wrap:focus-within) .card {
		border-color: var(--card-hover-border);
		border-left-color: var(--gold);
		box-shadow:
			0 24px 60px var(--card-hover-out),
			0 0 40px color-mix(in oklch, var(--gold) 8%, transparent),
			inset 0 1px 0 var(--card-hover-in);
	}

	:global(.tilt-wrap:hover) .card-media img,
	:global(.tilt-wrap:focus-within) .card-media img {
		transform: scale(1.08);
	}

	:global(.tilt-wrap:hover) .arrow,
	:global(.tilt-wrap:focus-within) .arrow {
		transform: translateX(5px);
		opacity: 1;
	}

	.card-media {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2.5rem 1.5rem 1.5rem;
		min-height: 120px;

		&::before {
			content: '';
			position: absolute;
			inset: 20% 25%;
			border-radius: 50%;
			background: radial-gradient(
				circle,
				color-mix(in oklch, var(--gold) 8%, transparent),
				transparent 70%
			);
			filter: blur(12px);
			pointer-events: none;
		}

		& img {
			position: relative;
			z-index: 1;
			width: auto;
			max-width: 120px;
			max-height: 70px;
			height: auto;
			object-fit: contain;
			transition: transform var(--t-normal) var(--ease-spring);
			filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
		}
	}

	.icon-placeholder {
		font-size: 2.5rem;
		opacity: 0.18;
		color: var(--gold);
	}

	.card-body {
		padding: 0 1.5rem 1rem;
		flex: 1;

		& h3 {
			font-size: 0.8rem;
			letter-spacing: 2.5px;
			font-weight: 400;
			color: var(--card-title);
			margin: 0 0 0.35rem;
			text-transform: uppercase;
		}

		& .subtitle {
			font-size: 0.68rem;
			color: var(--gold-text);
			letter-spacing: 1px;
			text-transform: uppercase;
			opacity: 0.65;
			margin: 0;
		}
	}

	.card-links {
		border-top: 1px solid var(--gold-08);
		padding: 0.65rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.link-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--gold);
		font-size: 0.75rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		transition: color var(--t-fast);

		&:hover {
			color: var(--link-hover);
		}
	}

	.arrow {
		opacity: 0.4;
		transition:
			transform var(--t-fast) var(--ease-spring),
			opacity var(--t-fast);
	}
</style>
