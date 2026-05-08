<script>
	import Faq from '$lib/pages/faq/faq.svelte';
	let lang = 'en';
</script>

<svelte:head>
	<title>Blackcoin FAQ – Frequently Asked Questions</title>
	<meta
		name="description"
		content="Answers to common questions about Blackcoin (BLK): how Proof of Stake works, staking rewards, wallets, transactions, and more."
	/>
</svelte:head>

<div id="home"></div>
<Faq {lang} />
