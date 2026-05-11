<script>
	import { onMount } from 'svelte';
	import copyHTML from './copyHTML';
	import QrCodeGen from './qr-code-gen.svelte';

	let { address: rawAddress, width, qr = $bindable('') } = $props();

	let address = $derived(typeof rawAddress === 'string' ? ['BLK', rawAddress] : rawAddress);
	let copied = $state(false);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<div class="rel">
	{address[0]}:
	<span class="golden">
		{mounted && width < 1080 ? address[1].substring(0, 8) + '...' : address[1]}
		<p class="copied" style="display: {copied ? 'flex' : 'none'};">Copied!</p>
	</span>
	<br />
	<button
		class="icon-btn"
		aria-label="Copy address"
		onclick={() => {
			copied = !copied;
			setTimeout(() => (copied = !copied), 1000);
			copyHTML(address[1]);
		}}
		onkeydown={(e) =>
			e.key === 'Enter' &&
			((copied = !copied), setTimeout(() => (copied = !copied), 1000), copyHTML(address[1]))}
	>
		<img width="512" height="512" src="/images/common/copy.svg" alt="" />
	</button>
	{#if qr !== address[1]}
		<button
			class="icon-btn"
			aria-label="Show QR code"
			onclick={() => {
				qr = address[1];
			}}
			onkeydown={(e) => e.key === 'Enter' && (qr = address[1])}
		>
			<img width="110" height="110" src="/images/common/qr.svg" alt="" />
		</button>
	{:else}
		<div
			role="button"
			tabindex="0"
			onclick={() => {
				qr = '';
			}}
			onkeydown={(e) => e.key === 'Enter' && (qr = '')}
		>
			<QrCodeGen value={qr} size={width > 1080 ? width * 0.1 : width * 0.5} />
		</div>
	{/if}
</div>

<style>
	.golden {
		font-size: 1.1rem;
		word-break: break-all;
	}
	.rel {
		width: fit-content;
		position: relative;
	}
	.icon-btn {
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		display: inline-flex;
	}
	img {
		width: 2rem;
		margin: 0.3rem;
		height: auto;
	}
	.copied {
		position: absolute;
		right: 50%;
		top: 25%;
		background-color: color-mix(in oklch, var(--ink-0) 60%, transparent);
		padding: 0.5rem;
		box-shadow: 1px 1px 1rem var(--ink-0);
		z-index: 100;
	}
	@media (min-width: 700px) {
		img {
			width: 2.5rem;
		}
	}
	@media (min-width: 1440px) {
		img {
			width: 2.75rem;
			height: auto;
		}
	}
</style>
