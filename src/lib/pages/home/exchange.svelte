<script>
	import SpecialText from '$lib/components/common/special-text.svelte';
	import exchangeI18n from './exchange.i18n';
	import exchangeList from './exchange-list';
	import i18n from '$lib/i18n';
	export let lang;
</script>

<div class="parallax-section">
	<div class="bg-overlay">
		<div class="container">
			<div class="centered">
				<h3 id="buy" class="golden">
					<SpecialText text={i18n(exchangeI18n, 'where_to_buy', lang)} inView={true} speed={20} />
				</h3>
			</div>

			<div class="marquee-wrap">
				<div class="marquee-track">
					{#each [0, 1] as seg (seg)}
						<div class="segment" aria-hidden={seg === 1 ? 'true' : undefined}>
							{#each exchangeList as e (e.url)}
								<a href={e.url} class="logo-link" target="_blank" rel="noopener noreferrer">
									<picture>
										{#if e.image.split('.').pop() !== 'svg'}
											<source srcset={e.image.replace(/\.[^.]+$/, '.webp')} type="image/webp" />
										{/if}
										<img src={e.image} alt={e.name} loading="lazy" width="160" height="48" />
									</picture>
								</a>
							{/each}
						</div>
					{/each}
				</div>
			</div>

			<div class="centered">
				<h4>
					<span>
						<span style="color: var(--text-mid);"
							><i class="fa fa-info-circle"></i>
							{i18n(exchangeI18n, 'check', lang)}
						</span>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.coingecko.com/en/coins/blackcoin"
						>
							{i18n(exchangeI18n, 'markets_volume', lang)}
						</a>
					</span>
				</h4>
			</div>
		</div>
	</div>
</div>

<style>
	.parallax-section {
		background: url('/images/sea-2.webp');
		background-size: cover;
		background-position: 50%;
		background-attachment: fixed;
	}

	@media (max-width: 699px) {
		.parallax-section {
			background-attachment: scroll;
		}
	}

	.bg-overlay {
		background: var(--exchange-overlay);
		backdrop-filter: blur(2px);
		-webkit-backdrop-filter: blur(2px);
		padding: 4rem 0;
	}

	.container {
		max-width: min(95%, 1600px);
		margin: 0 auto;
	}

	.centered {
		text-align: center;
	}

	h3 {
		font-size: 2rem;
		padding: 0 0 1.5rem;
	}

	.marquee-wrap {
		position: relative;
		overflow: hidden;
		padding: 1.5rem 0;
		mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 8%,
			black 92%,
			transparent 100%
		);
	}

	.marquee-track {
		display: flex;
		width: max-content;
		animation: marquee-scroll 32s linear infinite;
		will-change: transform;

		&:hover {
			animation-play-state: paused;
		}
	}

	@keyframes marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.segment {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.logo-link {
		display: flex;
		align-items: center;
		padding: 0 2.5rem;
		opacity: 0.55;
		filter: grayscale(20%);
		transition:
			opacity var(--t-normal) var(--ease-smooth),
			filter var(--t-normal) var(--ease-smooth),
			transform var(--t-normal) var(--ease-spring);

		&:hover {
			opacity: 1;
			filter: grayscale(0%) drop-shadow(0 4px 12px var(--gold-25));
			transform: scale(1.1);
		}
	}

	img {
		height: 48px;
		width: 160px;
		object-fit: contain;
	}
</style>
