<script>
	import socialLinks from './social-links';
</script>

<div class="social-links-section">
	<!-- Traveling gold beam along the top border, inspired by shine-border.svelte -->
	<div class="beam-rail" aria-hidden="true">
		<div class="beam"></div>
	</div>

	<div class="marquee-wrap">
		<!-- SVG bloom filter, inspired by backlight.svelte -->
		<svg width="0" height="0" aria-hidden="true" style="position:absolute">
			<filter id="social-bloom" x="-50%" y="-50%" width="200%" height="200%">
				<feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blurred" />
				<feColorMatrix type="saturate" in="blurred" values="5" />
				<feComposite in="SourceGraphic" operator="over" />
			</filter>
		</svg>

		<div class="marquee-track">
			{#each [0, 1, 2, 3] as seg (seg)}
				<div class="segment" aria-hidden={seg !== 0 ? 'true' : undefined}>
					{#each socialLinks as l (l.url)}
						<a href={l.url} class="link-item" target="_blank" rel="noopener noreferrer">
							<span class="icon-orb">
								<img src={l.img} alt="" width="13" height="13" loading="lazy" />
							</span>
							<span class="label">{l.alt}</span>
						</a>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.social-links-section {
		position: relative;
		background: linear-gradient(to bottom, var(--ink-1), var(--ink-0));
		border-top: 1px solid var(--gold-08);
		overflow: hidden;
	}

	/* Traveling beam — adapted from shine-border.svelte, pure CSS keyframe */
	.beam-rail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		overflow: hidden;
		pointer-events: none;
	}

	.beam {
		position: absolute;
		top: 0;
		left: -20%;
		width: 20%;
		height: 100%;
		background: linear-gradient(
			to right,
			transparent,
			var(--gold-40) 40%,
			var(--gold) 50%,
			var(--gold-40) 60%,
			transparent
		);
		animation: beam-travel 6s linear infinite;
	}

	@keyframes beam-travel {
		from {
			left: -20%;
		}
		to {
			left: 120%;
		}
	}

	.marquee-wrap {
		padding: 0.8rem 0;
		overflow: hidden;
		mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 6%,
			black 94%,
			transparent 100%
		);
	}

	.marquee-track {
		display: flex;
		width: max-content;
		animation: social-scroll 50s linear infinite;
		will-change: transform;

		&:hover {
			animation-play-state: paused;
		}
	}

	@keyframes social-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-25%);
		}
	}

	.segment {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.link-item {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.25rem 1.1rem;
		border-right: 1px solid var(--border-lo);
		white-space: nowrap;
		transition:
			transform var(--t-fast) var(--ease-spring),
			opacity var(--t-fast);

		&:hover {
			transform: scale(1.06);

			.icon-orb {
				border-color: var(--gold-40);
				/* bloom filter — backlight.svelte pattern */
				filter: url(#social-bloom);
				box-shadow: 0 0 8px var(--gold-25);
			}

			/* animated gradient text — animated-gradient-text.svelte pattern */
			.label {
				background-image: linear-gradient(90deg, var(--gold-text), var(--gold), var(--gold-text));
				background-size: 200% 100%;
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				animation: label-shimmer 1.4s linear infinite;
			}
		}
	}

	/* Circular icon frame — inspired by logo-carousel and dock-icon patterns */
	.icon-orb {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 1px solid var(--border-lo);
		background: radial-gradient(circle at 35% 35%, var(--ink-3), var(--ink-2));
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition:
			border-color var(--t-fast) var(--ease-smooth),
			box-shadow var(--t-fast) var(--ease-smooth),
			filter var(--t-fast) var(--ease-smooth);

		img {
			display: block;
			width: 13px;
			height: 13px;
			object-fit: contain;
		}
	}

	.label {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 1.8px;
		color: var(--text-dim);
		transition: color var(--t-fast);
	}

	@keyframes label-shimmer {
		from {
			background-position: 200% 0;
		}
		to {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
		.beam {
			animation: none;
			display: none;
		}
	}
</style>
