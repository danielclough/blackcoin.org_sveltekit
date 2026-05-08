<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tiltLimit?: number;
		scale?: number;
		perspective?: number;
		spotlight?: boolean;
		children?: Snippet;
	}

	let {
		tiltLimit = 12,
		scale = 1.04,
		perspective = 1100,
		spotlight = true,
		children
	}: Props = $props();

	let hovered = $state(false);
	let px = $state(0.5);
	let py = $state(0.5);

	const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

	function onMove(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		px = clamp((e.clientX - r.left) / r.width);
		py = clamp((e.clientY - r.top) / r.height);
	}

	const xform = $derived(
		hovered
			? `perspective(${perspective}px) rotateX(${(py - 0.5) * tiltLimit * -2}deg) rotateY(${(px - 0.5) * tiltLimit * 2}deg) scale3d(${scale},${scale},${scale})`
			: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
	);
</script>

<div
	class="tilt-wrap"
	role="presentation"
	style:transform={xform}
	onpointerenter={() => (hovered = true)}
	onpointermove={onMove}
	onpointerleave={() => (hovered = false)}
>
	{@render children?.()}

	{#if spotlight}
		<div class="spotlight" style:opacity={hovered ? 1 : 0}>
			<div class="orb" style:left="{px * 100}%" style:top="{py * 100}%"></div>
		</div>
	{/if}
</div>

<style>
	.tilt-wrap {
		position: relative;
		overflow: hidden;
		will-change: transform;
		transform-style: preserve-3d;
		transition: transform 0.2s ease-out;
		height: 100%;
	}

	.spotlight {
		position: absolute;
		inset: 0;
		z-index: 10;
		pointer-events: none;
		overflow: hidden;
		transition: opacity 0.3s;
	}

	.orb {
		position: absolute;
		width: 200%;
		height: 200%;
		translate: -50% -50%;
		transition:
			left 0.2s ease-out,
			top 0.2s ease-out;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.11) 0%, transparent 40%);
	}

	@media (hover: none) {
		.tilt-wrap {
			transform: none !important;
			transition: none;
		}
		.spotlight {
			display: none;
		}
	}
</style>
