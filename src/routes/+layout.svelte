<script>
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/header/nav.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import { theme } from '$lib/stores/theme';
	import '$lib/styles.css';

	let { data, children } = $props();
	let lang = $derived(data.lang || 'en');

	onMount(() => theme.init());
</script>

<Navbar {lang} />
<div class="slot-container">
	{@render children?.()}
</div>
<Footer {lang} />
