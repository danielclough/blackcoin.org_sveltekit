<!-- {% set 'pageUrl' = page.url.split('/').slice(2).join('/') %} -->
<script>
	import locales from './locales';
	import SELECT_LANGUAGE from './lang-select.i18n';
	import HiddenLinks from './hidden-links.svelte';

	let { lang, y = $bindable(0) } = $props();
	let menuOpen = $state(false);

	const openClose = () => {
		menuOpen = !menuOpen;
		if (y === 0) y = 1;
	};
</script>

<div id="lang-select">
	<button id="menuOpener" onclick={() => openClose()}
		>{SELECT_LANGUAGE[lang] || SELECT_LANGUAGE['en']}</button
	>
	<ul id="menu-locale" style="display: {menuOpen ? 'flex' : 'none'};">
		{#each locales as locale (locale.code)}
			<li>
				<a
					onclick={() => (menuOpen = false)}
					href="/{locale.code}"
					rel="/{locale.code} {lang}"
					hreflang={locale.code}>{locale.label}</a
				>
			</li>
		{/each}
		<li class="space-on-mobile" aria-hidden="true"></li>
	</ul>
</div>

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
		color: var(--gold-text);
		background-color: transparent;
		border: none;
		padding-bottom: 1rem;
		font-size: 0.75rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		cursor: pointer;
	}

	#menuOpener:hover {
		color: var(--link-hover);
	}

	#menu-locale {
		width: 100vw;
		height: fit-content;
		max-height: 80vh;
		overflow-y: auto;
		overflow-x: hidden;
		position: absolute;
		right: 0;
		top: 5rem;
		flex-wrap: wrap;
		justify-content: center;
		align-content: space-around;
		background-color: var(--page-bg);
	}

	#menu-locale {
		list-style: none;
		padding: 0;
	}

	#menu-locale li {
		width: 33vw;
	}

	#menu-locale li a {
		display: block;
		text-align: center;
		background-color: var(--page-bg);
		padding: 0.5rem;
		font-size: 0.9rem;
		color: var(--gold);
	}

	#menu-locale li a:hover {
		color: var(--link-hover);
		background-color: var(--ink-3);
	}

	@media (min-width: 300px) {
		#menuOpener {
			font-size: 0.8rem;
		}

		#menu-locale li a {
			padding: 0.75rem;
		}
	}

	@media (min-width: 700px) {
		#menu-locale li a {
			font-size: 1rem;
		}

		#menuOpener {
			font-size: 0.9rem;
			padding: 0;
		}
	}

	@media (min-width: 1080px) {
		#menu-locale {
			background-color: var(--page-bg);
		}

		#menu-locale li {
			width: 15vw;
		}

		#menu-locale li a {
			font-size: 1rem;
		}

		#menuOpener {
			font-size: 0.9rem;
			padding: 0;
		}

		.space-on-mobile {
			display: none;
		}
	}

	@media (min-width: 1440px) {
		#menu-locale li a {
			font-size: 1.1rem;
		}
	}

	@media (min-width: 2560px) {
		#menu-locale li a {
			font-size: 1.25rem;
		}
	}
</style>
