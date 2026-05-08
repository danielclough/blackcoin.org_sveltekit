<script>
	import Hero from '$lib/pages/home/hero.svelte';
	import About from '$lib/pages/home/about.svelte';
	import Exchange from '$lib/pages/home/exchange.svelte';
	import Downloads from '$lib/pages/home/downloads.svelte';
	import SocialMedia from '$lib/pages/home/social.svelte';
	import Donations from '$lib/pages/home/donations.svelte';
	import SocialLinks from '$lib/pages/home/social-links.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;
	let lang = data.lang || 'en';

	onMount(() => {
		const detected = window.navigator.languages.find((x) => x.length === 2);
		if (detected && detected !== 'en') goto(`/${detected}`);
	});

	let width;
</script>

<svelte:window bind:innerWidth={width} />

<svelte:head>
	<title>Blackcoin – Pure Proof of Stake Since 2014</title>
	<meta
		name="description"
		content="Blackcoin (BLK) is a decentralised digital currency with near-instant transaction speeds and negligible fees, built on Proof of Stake 3.1 (PoSV3). Running since 2014."
	/>
	<meta name="lang" content={lang} />
</svelte:head>

<div id="home"></div>
<Hero {lang} />
<About {lang} />
<Exchange {lang} />
<Downloads {lang} />
<SocialMedia {lang} />
<Donations {lang} bind:width />
<SocialLinks />
