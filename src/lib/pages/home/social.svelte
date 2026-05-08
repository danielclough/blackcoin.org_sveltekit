<script>
	import { onMount, onDestroy } from 'svelte';
	import { confetti } from '@neoconfetti/svelte';
	import SpecialText from '$lib/components/common/special-text.svelte';
	import TiltCard from '$lib/components/common/tilt-card.svelte';
	import i18n from '$lib/i18n';
	import social from './social-links';
	import socialI18n from './social.i18n';

	let { lang } = $props();

	// Confetti on icon click — adapted from confetti-button.svelte
	// @neoconfetti/svelte is already installed in this project
	const CONFETTI_OPTS = {
		particleCount: 28,
		force: 0.45,
		colors: ['#ddb77a', '#ffd89b', '#ca6', '#e8a040', '#fea', '#dda050'],
		stageHeight: 500,
		stageWidth: 700
	};
	let activeConfetti = $state(-1);
	function fireConfetti(i) {
		activeConfetti = -1;
		// brief tick to re-trigger the action on same index
		setTimeout(() => (activeConfetti = i), 16);
	}

	// Stagger icon reveal — adapted from blur-fade / words-stagger concept
	let listEl = $state(null);
	let inView = $state(false);
	onMount(() => {
		if (!listEl) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					inView = true;
					obs.disconnect();
				}
			},
			{ threshold: 0.15 }
		);
		obs.observe(listEl);
		return () => obs.disconnect();
	});

	// Morphing platform names — adapted from morphing-text.svelte
	// Pure requestAnimationFrame loop, no deps, blur+opacity DOM morph
	const platforms = social.map((s) => s.alt);
	const MORPH_TIME = 1.3;
	const COOLDOWN_TIME = 0.9;

	let morphEl1 = $state(null);
	let morphEl2 = $state(null);
	let morphIdx = 0;
	let morphProgress = 0;
	let morphCooldown = 0;
	let morphLastTime = 0;
	let morphRaf = null;

	function setMorphStyles(fraction) {
		if (!morphEl1 || !morphEl2) return;
		/* eslint-disable svelte/no-dom-manipulating */
		morphEl2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
		morphEl2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
		const inv = 1 - fraction;
		morphEl1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
		morphEl1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
		morphEl1.textContent = platforms[morphIdx % platforms.length];
		morphEl2.textContent = platforms[(morphIdx + 1) % platforms.length];
		/* eslint-enable svelte/no-dom-manipulating */
	}

	function morphStep(time) {
		morphRaf = requestAnimationFrame(morphStep);
		const dt = morphLastTime ? (time - morphLastTime) / 1000 : 0;
		morphLastTime = time;
		morphCooldown -= dt;

		if (morphCooldown <= 0) {
			morphProgress -= morphCooldown;
			morphCooldown = 0;
			let fraction = morphProgress / MORPH_TIME;
			if (fraction > 1) {
				morphCooldown = COOLDOWN_TIME;
				fraction = 1;
			}
			setMorphStyles(fraction);
			if (fraction === 1) morphIdx++;
		} else {
			// hold current text cleanly during cooldown
			morphProgress = 0;
			if (morphEl1 && morphEl2) {
				morphEl2.style.filter = 'none';
				morphEl2.style.opacity = '100%';
				morphEl1.style.filter = 'none';
				morphEl1.style.opacity = '0%';
			}
		}
	}

	onMount(() => {
		/* eslint-disable svelte/no-dom-manipulating */
		if (morphEl1) morphEl1.textContent = platforms[0];
		if (morphEl2) morphEl2.textContent = platforms[1];
		/* eslint-enable svelte/no-dom-manipulating */
		morphRaf = requestAnimationFrame(morphStep);
	});

	onDestroy(() => {
		if (morphRaf !== null) cancelAnimationFrame(morphRaf);
	});
</script>

<div class="parallax-section">
	<!-- Retro grid: adapted from retro-grid.svelte — CSS perspective grid, no deps -->
	<div class="retro-grid" aria-hidden="true">
		<div class="retro-grid-inner"></div>
		<div class="retro-grid-fade"></div>
	</div>

	<div class="bg-overlay">
		<div class="container">
			<div class="centered">
				<!-- Aurora heading: adapted from aurora-text.svelte — animated gradient, no deps -->
				<h3 id="community" class="aurora-heading">
					<SpecialText text={i18n(socialI18n, 'join_community', lang)} inView={true} speed={22} />
				</h3>

				<!-- Morphing platform names — adapted from morphing-text.svelte -->
				<!-- Pure RAF loop: blur+opacity DOM morph + feColorMatrix threshold filter -->
				<div class="morph-wrap" role="region" aria-label="Platforms: {platforms.join(', ')}">
					<svg class="morph-filter" aria-hidden="true">
						<defs>
							<filter id="morph-threshold">
								<feColorMatrix
									in="SourceGraphic"
									type="matrix"
									values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
								/>
							</filter>
						</defs>
					</svg>
					<div class="morph-stage">
						<span bind:this={morphEl1} class="morph-text" aria-hidden="true"></span>
						<span bind:this={morphEl2} class="morph-text" aria-hidden="true"></span>
					</div>
				</div>
			</div>

			<!-- Ripple rings: adapted from ripple.svelte — concentric gold pulse -->
			<div class="ripple-wrap" aria-hidden="true">
				{#each [0, 1, 2, 3, 4, 5] as i (i)}
					<div
						class="ring"
						style="
							--ring-size: {160 + i * 80}px;
							--ring-opacity: {0.16 - i * 0.022};
							--ring-delay: {i * 0.2}s;
						"
					></div>
				{/each}
			</div>

			<!-- Icons: stagger reveal + TiltCard + pulse ring + confetti on click -->
			<ul bind:this={listEl} class:in-view={inView}>
				{#each social as s, i (s.url)}
					<li style="--i: {i}">
						<TiltCard tiltLimit={10} scale={1.06} spotlight={false}>
							<!-- confetti-button.svelte pattern: use:confetti fires from this element -->
							<a
								href={s.url}
								target="_blank"
								rel="noopener noreferrer"
								onclick={() => fireConfetti(i)}
							>
								{#if activeConfetti === i}
									<div use:confetti={CONFETTI_OPTS} class="confetti-anchor"></div>
								{/if}
								<div class="icon-wrap">
									<img height="60" width="60" src={s.img} alt={s.alt} loading="lazy" />
								</div>
								<span class="icon-name">{s.alt}</span>
							</a>
						</TiltCard>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.parallax-section {
		position: relative;
		background: radial-gradient(ellipse at 30% 50%, #0f0c06 0%, #050402 65%, #000 100%);
		border-top: 1px solid var(--gold-08);
		border-bottom: 1px solid var(--gold-08);
		overflow: hidden;
	}

	/* ── Retro grid (retro-grid.svelte) ──────────────────────────────── */
	/* Pure CSS perspective grid — no deps, no Tailwind                  */
	.retro-grid {
		position: absolute;
		inset: 0;
		pointer-events: none;
		perspective: 220px;
		overflow: hidden;
		opacity: 0.35;
	}

	.retro-grid-inner {
		position: absolute;
		/* extend far beyond viewport so the perspective fill is seamless */
		inset: 0;
		width: 600%;
		height: 300%;
		margin-left: -200%;
		transform-origin: 100% 0 0;
		transform: rotateX(65deg);
		background-image:
			linear-gradient(to right, var(--gold-15) 1px, transparent 0),
			linear-gradient(to bottom, var(--gold-15) 1px, transparent 0);
		background-size: 60px 60px;
		animation: grid-scroll 18s linear infinite;
	}

	@keyframes grid-scroll {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 0 60px;
		}
	}

	/* Fade grid out toward the top so it doesn't overwhelm the heading */
	.retro-grid-fade {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, #000 0%, transparent 45%, #000 100%);
	}

	/* ── Background overlay / layout ─────────────────────────────────── */
	.bg-overlay {
		position: relative;
		padding: 4rem 0;
	}

	.container {
		position: relative;
		width: 90%;
		max-width: 960px;
		margin: 0 auto;
	}

	/* ── Aurora heading (aurora-text.svelte) ─────────────────────────── */
	/* Animated gradient sweep across gold tones, background-clip: text  */
	.centered {
		text-align: center;
		position: relative;
		z-index: 1;
	}

	h3 {
		margin-bottom: 0.5rem;
		padding: 1vw;
	}

	.aurora-heading :global(span) {
		background-image: linear-gradient(
			135deg,
			#c8843a,
			#e8b060,
			#ffd89b,
			var(--gold),
			#e8a040,
			#ca6,
			#c8843a
		);
		background-size: 300% auto;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		animation: aurora-shift 8s linear infinite;
		/* Keep text-shadow from conflicting with -webkit-text-fill-color */
		text-shadow: none;
	}

	@keyframes aurora-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	/* ── Ripple rings (ripple.svelte) ────────────────────────────────── */
	.ripple-wrap {
		position: absolute;
		left: 50%;
		top: 50%;
		pointer-events: none;
		z-index: 0;
	}

	.ring {
		position: absolute;
		width: var(--ring-size);
		height: var(--ring-size);
		top: 50%;
		left: 50%;
		border-radius: 50%;
		border: 1px solid var(--gold-25);
		animation: ring-pulse 4.5s ease-in-out var(--ring-delay) infinite;
	}

	@keyframes ring-pulse {
		0%,
		100% {
			transform: translate(-50%, -50%) scale(1);
			opacity: var(--ring-opacity);
		}
		50% {
			transform: translate(-50%, -50%) scale(0.92);
			opacity: calc(var(--ring-opacity) * 0.4);
		}
	}

	/* ── Icon grid with stagger reveal ───────────────────────────────── */
	ul {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 110px));
		gap: 1.5rem 1rem;
		padding: 2rem 1rem;
		justify-content: center;
		justify-items: center;
		position: relative;
		z-index: 1;
	}

	@media (min-width: 700px) {
		ul {
			grid-template-columns: repeat(9, 1fr);
			gap: 1rem;
			padding: 2.5rem 0;
		}
	}

	li {
		width: auto;
		margin: 0;
		opacity: 0;
		transform: translateY(18px);
		filter: blur(6px);
	}

	/* Stagger reveal — blur-fade / words-stagger concept */
	ul.in-view li {
		animation: icon-reveal 0.55s var(--ease-out) calc(var(--i) * 0.07s) both;
	}

	@keyframes icon-reveal {
		from {
			opacity: 0;
			transform: translateY(18px);
			filter: blur(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	li :global(.tilt-wrap) {
		border-radius: 12px;
	}

	/* ── Icon link + pulse ring (pulsating-button concept) ───────────── */
	a {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		padding: 0.5rem;

		&:hover {
			& .icon-wrap {
				border-color: var(--gold-40);
				box-shadow:
					0 0 20px var(--gold-15),
					0 8px 24px rgba(0, 0, 0, 0.5);
			}
			& .icon-wrap::after {
				animation: pulse-ring 1.1s var(--ease-out) infinite;
			}
			& img {
				filter: brightness(1.25);
			}
			& .icon-name {
				color: var(--gold-text);
			}
		}
	}

	.icon-wrap {
		position: relative;
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: radial-gradient(circle at 30% 30%, var(--ink-3), var(--ink-2));
		border: 1px solid var(--gold-15);
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			border-color var(--t-normal) var(--ease-smooth),
			box-shadow var(--t-normal) var(--ease-smooth);

		/* Pulse ring pseudo-element — pulsating-button.svelte concept */
		&::after {
			content: '';
			position: absolute;
			inset: -5px;
			border-radius: 50%;
			border: 1px solid var(--gold-40);
			opacity: 0;
			transform: scale(1);
		}
	}

	@media (min-width: 700px) {
		.icon-wrap {
			width: 88px;
			height: 88px;
			border: 1px solid var(--gold-25);
			background: radial-gradient(circle at 35% 25%, var(--ink-4), var(--ink-2) 70%);
			box-shadow:
				0 4px 20px rgba(0, 0, 0, 0.5),
				inset 0 1px 0 var(--gold-15);
		}

		img {
			width: 50px;
			height: 50px;
		}

		a:hover .icon-wrap {
			border-color: var(--gold-60);
			box-shadow:
				0 0 28px var(--gold-25),
				0 12px 40px rgba(0, 0, 0, 0.6),
				inset 0 1px 0 var(--gold-25);
		}
	}

	/* Expanding ring that fades out — adapted from pulsating-button variants */
	@keyframes pulse-ring {
		0% {
			transform: scale(1);
			opacity: 0.7;
		}
		100% {
			transform: scale(1.6);
			opacity: 0;
		}
	}

	img {
		display: block;
		width: 40px;
		height: 40px;
		object-fit: contain;
		transition: filter var(--t-normal) var(--ease-smooth);
	}

	.icon-name {
		display: block;
		text-align: center;
		font-size: 0.55rem;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		color: var(--text-lo);
		transition: color var(--t-fast);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 90px;
	}

	/* ── Confetti anchor (confetti-button.svelte) ────────────────────── */
	/* Zero-size element positioned at icon center; use:confetti fires from here */
	.confetti-anchor {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	/* ── Morphing platform names (morphing-text.svelte) ──────────────── */
	.morph-wrap {
		position: relative;
		z-index: 1;
		margin: 0.1rem 0 0.4rem;
	}

	/* The hidden SVG housing the feColorMatrix threshold filter */
	.morph-filter {
		position: absolute;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	/* Apply threshold filter so the blur edges snap into solid glyphs */
	.morph-stage {
		position: relative;
		height: 1.1rem;
		filter: url(#morph-threshold) blur(0.3px);
	}

	.morph-text {
		position: absolute;
		inset: 0;
		text-align: center;
		font-size: 1.5rem;
		letter-spacing: 3.5px;
		text-transform: uppercase;
		color: var(--gold-text);
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.retro-grid-inner {
			animation: none;
		}
		.ring {
			animation: none;
			opacity: 0;
		}
		.aurora-heading :global(span) {
			animation: none;
		}
		li {
			opacity: 1;
			transform: none;
			filter: none;
		}
		ul.in-view li {
			animation: none;
		}
		/* Show first platform name statically */
		.morph-stage {
			filter: none;
		}
		.morph-text:first-child {
			opacity: 0;
		}
		.morph-text:last-child {
			opacity: 1;
			filter: none !important;
		}
		/* Confetti particles are already CSS-animation-based; neoconfetti respects reduced motion */
		.confetti-anchor {
			display: none;
		}
	}
</style>
