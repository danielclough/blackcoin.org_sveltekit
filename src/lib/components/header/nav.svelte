<script>
	import Hamburger from './hamburger.svelte';
	import i18n from '$lib/i18n';
	import navI18n from './nav.i18n';
	import LangSelect from './lang-select.svelte';
	import MenuItems from './menu-items.svelte';

	const openClose = () => {
		if (y === 0) y = 1;
	};

	export let lang;
	export let y = 0;
	let open = false;
</script>

<svelte:window bind:scrollY={y} />
<nav id="navbar">
	<div
		class="bar"
		style={y !== 0
			? `background-image: linear-gradient(var(--nav-bg-start), var(--nav-bg-mid), var(--nav-bg-end), var(--nav-bg-end), transparent);`
			: 'background: transparent'}
	>
		<a id="nav-logo" href="/{i18n(navI18n, 'locale', lang)}/">
			<picture>
				<source srcset="/images/blkb.webp" type="image/webp" />
				<source srcset="/images/blkb.png" type="image/png" />
				<img height="526" width="402" src="/images/blkb.png" alt="Blackcoin - Logo" />
			</picture>
		</a>

		{#if open}
			<MenuItems {lang} bind:y bind:open />
		{/if}
		<div class="show-on-desktop">
			<MenuItems {lang} bind:y {open} />
		</div>

		<div class="btns">
			<LangSelect {lang} bind:y />
			<div id="burger">
				<Hamburger onclick={() => openClose()} bind:open />
			</div>
		</div>
	</div>
</nav>

<style>
	a {
		color: var(--nav-link);
		text-shadow: 1px 1px 1px var(--nav-shadow);
	}

	#burger {
		display: flex;
		align-content: center;
	}

	#navbar {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 100;
		height: auto;
		margin-top: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-flow: row;
	}

	.show-on-desktop {
		display: none;
	}

	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem 0.75rem;
		width: 100vw;
		position: absolute;
		top: 0;
		left: 0;
	}

	.btns {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	#nav-logo img {
		width: 4rem;
		height: auto;
	}

	@media (min-width: 300px) {
		.bar {
			padding: 0.5rem 5vw 0.75rem;
		}
	}

	@media (min-width: 1080px) {
		.bar {
			padding: 0.5rem 3vw 0.75rem;
		}

		#burger {
			display: none;
		}

		.show-on-desktop {
			display: flex;
		}
	}

	@media (min-width: 1440px) {
		.bar {
			padding: 0.5rem 4rem 0.75rem;
		}
	}

	@media (min-width: 2560px) {
		.bar {
			padding: 0.5rem 15vw 0.75rem;
		}
	}
</style>
