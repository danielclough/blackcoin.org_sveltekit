<script>
	import Projects from '$lib/pages/donations/projects.svelte';
	export let data;
	$: lang = data.lang || 'en';
	let width;
</script>

<svelte:window bind:innerWidth={width} />

<svelte:head>
	<title>Blackcoin Donations – Support the Project</title>
	<meta
		name="description"
		content="Support Blackcoin development, outreach, and community members by donating BLK, BTC, ETH, or LTC to the addresses listed here."
	/>
	<link rel="preload" href="/js/qrcode.min.js" as="script" />
</svelte:head>

<div id="home"></div>
<Projects {lang} {width} />
