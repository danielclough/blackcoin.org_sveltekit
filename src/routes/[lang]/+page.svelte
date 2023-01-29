<script>
	import Hero from '$lib/pages/home/hero.svelte';
	import About from '$lib/pages/home/about.svelte';
	import Exchange from '$lib/pages/home/exchange.svelte';
	import Downloads from '$lib/pages/home/downloads.svelte';
	import SocialMedia from '$lib/pages/home/social.svelte';
	import Donations from '$lib/pages/home/donations.svelte';

	export let data;
	$: lang = data.lang;

	export let width;
</script>

<svelte:window bind:innerWidth={width} />

<svelte:head>
	<title>BlackcoinOrg</title>
	<meta name="description" content="BlackcoinOrg" />
	<meta name="lang" content={lang} />
</svelte:head>

<div id="home" />
<Hero {lang} bind:width />
<About {lang} />
<Exchange {lang} />
<Downloads {lang} />
<SocialMedia {lang} />
<Donations {lang} bind:width />
