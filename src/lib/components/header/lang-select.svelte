<!-- {% set 'pageUrl' = page.url.split('/').slice(2).join('/') %} -->
<script>
	import locales from './locales';
	import SELECT_LANGUAGE from './lang-select.i18n';
	import HiddenLinks from './hidden-links.svelte';
	export let lang;
	export let y;
	$: menuOpen = false;

	const openClose = () => {
		!!menuOpen ? (menuOpen = false) : (menuOpen = true);
		// move y pos down in order to make navbar black
		y === 0 ? y = 1 : null;
	}
</script>

<ul id="lang-select">
	<button id="menuOpener" on:click={() => openClose()}
		>{SELECT_LANGUAGE[lang] || SELECT_LANGUAGE['en']}</button
	>
	<ul id="menu-locale" style="display: {!!menuOpen ? 'flex' : 'none'};">
		{#each locales as locale}
			<a
				on:click={() => (menuOpen = false)}
				href="/{locale.code}"
				rel="/{locale.code} {lang}"
				hreflang={locale.code}><li>{locale.label}</li></a
			>
			<!-- <button on:click={()=>lang = locale.code}>{locale.code}</button> -->
		{/each}
		<!-- placeholder for where the open chat button is -->
		<a href="/" class="space-on-mobile" />
	</ul>
</ul>

<!-- HIDDEN - FOR STATIC BUILD -->
<HiddenLinks {locales} />

<style>
	
#lang-select {
	margin: 0;
	display: flex;
	align-content: center;
}

#menuOpener {
	float: right;
	color: #b2935b;
	background-color: transparent;
	border: none;
	padding-bottom: 1rem;
	font-size: x-small;
}

#menu-locale {
	width: 100vw;
	height: fit-content;
	margin-bottom: 5rem;
	overflow-y: scroll;
	overflow-x: hidden;
	position: absolute;
	right: 0;
	top: 5rem;
	flex-wrap: wrap;
	justify-content: center;
	align-content: space-around;
	background-color: #000;
}

/* #menu-locale button, */
#menu-locale a {
	text-align: center;
	background-color: #000;
	width: 33vw;
	padding: 0.5rem;
}

@media (min-width: 300px) {
	#menuOpener {
		font-size: normal;
	}

	#menu-locale a {
		padding: 0.75rem;
	}
}

@media (min-width: 700px) {
	#menu-locale a {
		font-size: x-large;
	}

	#menuOpener {
		font-size: large;
		padding: 0;
	}
}

@media (min-width: 1080px) {
	#menu-locale {
		background-color: #000;
	}

	#menu-locale a {
		width: 15vw;
		font-size: x-large;
	}

	#menuOpener {
		font-size: large;
		padding: 0;
	}

	.space-on-mobile {
		display: none;
	}
}

@media (min-width: 1440px) {
	#menu-locale a {
		font-size: xx-large;
	}
}

@media (min-width: 2560px) {
	#menu-locale a {
		font-size: xxx-large;
	}
}

</style>
