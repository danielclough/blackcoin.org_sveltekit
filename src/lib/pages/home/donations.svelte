<script type="ts">
	import i18n from '$lib/i18n';
	import donationsI18n from './donations.i18n';
	export let lang;
	export let width;
	import donationQuickAddresses from './donation-quick-addresses';
	import QrCodeGen from '$lib/components/common/qr-code-gen.svelte';
	import AddrQr from '$lib/components/common/addr-qr.svelte';
	$: qr = '';
</script>

<section>
	<div class="bg-overlay">
		<div class="container">
			<center>
				<h2 class="golden">
					{i18n(donationsI18n, 'donations', lang)}
				</h2>
				<h3 id="support">
					<span>{i18n(donationsI18n, 'support_blackcoin', lang)}</span>
				</h3>
				<p>
					{i18n(donationsI18n, 'donate_to', lang)}
					<a href="/donations"
						>{i18n(donationsI18n, 'person_project', lang)}</a
					>.
				</p>
				<p>
					{i18n(donationsI18n, 'simply_send', lang)}
				</p>
				<div>
					{#each donationQuickAddresses as address}
						<div class="addr">
							<AddrQr {address} {width} {qr} />
						</div>
					{/each}
				</div>
			</center>
		</div>
	</div>
</section>

<style>
	p {
		font-size: 1.5rem;
	}
	.addr {
		font-size: 1.7rem;
		padding: 0.5rem 0;
	}
	@media (min-width: 1440px) {
		p {
			font-size: 1.7rem;
		}
		.addr {
			font-size: 2rem;
		}
	}
</style>
