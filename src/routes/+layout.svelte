<script>
	import Navbar from '$lib/components/header/nav.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import '$lib/styles.css';

	export let data;
	$: lang = data.lang || 'en';

	import { onMount } from 'svelte';
	onMount(()=>{
		if (lang === 'en') {
			lang = window.navigator.languages.filter((x)=>x.length === 2)[0] || 'en';
		}
		console.log(lang)
	})

</script>

<Navbar {lang} />
<div class="slot-container">
	<slot />
</div>
<Footer {lang} />
