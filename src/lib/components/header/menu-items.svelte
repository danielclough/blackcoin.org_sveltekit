<script>
	import i18n from '$lib/i18n';
	import navI18n from './nav.i18n';

	let { lang, open = $bindable(false), y = $bindable(0) } = $props();
	let links = $state(false);

	let linkArr = $derived([
		{
			url: 'https://chainz.cryptoid.info/blk/',
			title: `CryptoID ${i18n(navI18n, 'explorer', lang)}`
		},
		{
			url: `https://www.coingecko.com/${i18n(navI18n, 'locale', lang)}/coins/blackcoin`,
			title: 'Coingecko'
		},
		{
			url: 'https://coinmarketcap.com/currencies/blackcoin/#charts',
			title: 'CoinMarketCap'
		},
		{
			url: 'https://blackcoin.nl',
			title: 'BlackcoinNL'
		},
		{
			url: 'https://bitinfocharts.com/blackcoin/',
			title: `Bitinfocharts ${i18n(navI18n, 'explorer', lang)}`
		},
		{
			url: 'https://github.com/coinblack/',
			title: 'Github'
		},
		{
			url: 'https://gitlab.com/blackcoin/',
			title: 'Gitlab'
		}
	]);

	const openClose = () => {
		links = !links;
		if (y === 0) y = 1;
	};
</script>

<ul id="main-menu">
	<li>
		<a onclick={() => (open = !open)} href="/{i18n(navI18n, 'locale', lang)}/#about">
			{i18n(navI18n, 'about', lang)}
		</a>
	</li>
	<li>
		<a onclick={() => (open = !open)} href="/{i18n(navI18n, 'locale', lang)}/#downloads">
			{i18n(navI18n, 'download', lang)}
		</a>
	</li>
	<li>
		<a onclick={() => (open = !open)} href="/{i18n(navI18n, 'locale', lang)}/donations">
			{i18n(navI18n, 'donations', lang)}
		</a>
	</li>
	<li id="faq">
		<a onclick={() => (open = !open)} href="/{i18n(navI18n, 'locale', lang)}/faq">
			<span>
				{i18n(navI18n, 'faq', lang)}
			</span>
		</a>
	</li>

	<li id="linksBtn">
		<button
			class="links-trigger"
			onclick={() => openClose()}
			onkeydown={(e) => e.key === 'Enter' && openClose()}
		>
			{i18n(navI18n, 'links', lang)}
		</button>
		<ul id="links" style="display:{links ? 'flex' : 'none'};">
			<button class="x">X</button>
			{#each linkArr as l (l.url)}
				<li>
					<a target="_blank" rel="noopener noreferrer" href={l.url} onclick={() => (open = !open)}>
						{l.title}
					</a>
				</li>
			{/each}
		</ul>
	</li>
</ul>

<style>
	li {
		color: var(--nav-link);
		text-shadow: 1px 1px 1px var(--nav-shadow);
	}

	#main-menu {
		position: absolute;
		top: 5rem;
		right: 0;
		width: 100vw;
		height: fit-content;
		display: flex;
		flex-direction: column;
		font-size: 1rem;
		line-height: 1.5rem;
		background-color: var(--page-bg);
		margin: 0;
		justify-content: center;
		align-content: center;
		display: flex;
		text-align: center;
	}

	#linksBtn {
		background-image: linear-gradient(rgba(255, 0, 0, 0.4), transparent);
		padding: 0.5rem !important;
		margin: 0 auto;
		border-radius: 5%;
	}

	#links {
		position: absolute;
		top: 5rem;
		justify-content: space-around;
	}

	.links-trigger {
		background: transparent;
		border: none;
		color: var(--nav-link);
		text-shadow: 1px 1px 1px var(--nav-shadow);
		font-size: inherit;
		font-family: inherit;
		cursor: pointer;
		padding: 0;
	}

	.x {
		background-color: transparent;
		width: fit-content;
		color: var(--text-hi);
		position: absolute;
		right: 1rem;
		top: 0;
		border-color: var(--gold);
		font-size: 1.5rem;
		padding: 0 0.75rem;
	}

	@media (min-width: 300px) {
		#main-menu {
			font-size: 2rem;
			line-height: 3rem;
		}

		#main-menu li {
			padding: 0 0.5rem;
		}
	}

	@media (min-width: 700px) {
		#main-menu {
			font-size: 4rem;
			line-height: 6rem;
		}
	}

	@media (min-width: 1080px) {
		#main-menu {
			position: initial;
			width: auto;
			height: auto;
			display: inline-flex;
			flex-direction: row;
			justify-content: center;
			align-content: center;
			font-size: 0.8rem;
			line-height: 1.5rem;
			background-color: transparent;
		}

		#main-menu li {
			padding: 0 0.5rem;
			align-self: center;
		}

		#linksBtn {
			padding-bottom: 1.2rem !important;
			margin: 1rem 0 0 0;
			align-self: center;
		}
		.x {
			display: none;
		}
	}

	@media (min-width: 1440px) {
		#main-menu {
			font-size: 1rem;
		}

		#main-menu li {
			padding: 0 0.5rem;
		}
	}

	@media (min-width: 2560px) {
		#main-menu {
			font-size: 1.75rem;
		}

		#main-menu li {
			padding: 0 1.5rem;
			font-size: 1rem;
		}
	}
</style>
