<script>
	import Projects from '$lib/pages/donations/projects.svelte';
	export let data;
	$: lang = data.lang;

	export let width;
</script>

<svelte:window bind:innerWidth={width} />

<div id="home" />
<Projects {width} />
