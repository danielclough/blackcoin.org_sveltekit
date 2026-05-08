<script lang="ts">
	import { onMount } from 'svelte';
	import i18n from '$lib/i18n';
	import donationsI18n from './donations.i18n';
	import type AddrQrComponent from '$lib/components/common/addr-qr.svelte';
	export let lang;
	export let width;
	import donationQuickAddresses from './donation-quick-addresses';
	let qr = '';
	let AddrQr: typeof AddrQrComponent | null = null;
	onMount(async () => {
		AddrQr = (await import('$lib/components/common/addr-qr.svelte')).default;
	});
</script>

<div class="parallax-section">
	<div class="bg-overlay">
		<div class="container">
			<div class="centered">
				<h2 class="golden">
					{i18n(donationsI18n, 'donations', lang)}
				</h2>
				<h3 id="support">
					<span>{i18n(donationsI18n, 'support_blackcoin', lang)}</span>
				</h3>
				<p>
					{i18n(donationsI18n, 'donate_to', lang)}
					<a href="/donations">{i18n(donationsI18n, 'person_project', lang)}</a>.
				</p>
				<p>
					{i18n(donationsI18n, 'simply_send', lang)}
				</p>
				<div class="addr-list">
					{#each donationQuickAddresses as address (address)}
						<div class="addr">
							{#if AddrQr}
								<svelte:component this={AddrQr} {address} {width} {qr} />
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.parallax-section {
		background:
			radial-gradient(
				ellipse at 50% 110%,
				color-mix(in oklch, var(--gold) 10%, transparent) 0%,
				transparent 55%
			),
			linear-gradient(to bottom, var(--ink-2), var(--ink-0));
	}

	.bg-overlay {
		background: transparent;
		padding: 3rem 0;
		display: flex;
		justify-content: center;
	}

	.container {
		width: 90%;
		max-width: 800px;
	}

	.centered {
		text-align: center;
	}

	p {
		font-size: 1rem;
	}

	.addr-list {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.addr {
		font-size: 1rem;
		padding: 0.5rem 0;
	}

	@media (min-width: 1080px) {
		p {
			font-size: 1.1rem;
		}
		.addr {
			font-size: 1.1rem;
		}
	}
</style>
