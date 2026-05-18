<script>
	import i18n from '$lib/i18n';
	import navI18n from './nav.i18n';
	import exchangeList from '$lib/pages/home/exchange-list';

	let { lang, open = $bindable(false), y = $bindable(0) } = $props();
	let links = $state(false);
	let ticker = $state(false);

	const marketArr = [
		{ name: 'CoinMarketCap', url: 'https://coinmarketcap.com/currencies/blackcoin/#charts' },
		{ name: 'CoinGecko', url: 'https://www.coingecko.com/en/coins/blackcoin' }
	];

	let linkArr = $derived([
		{
			url: 'https://chainz.cryptoid.info/blk/',
			title: `CryptoID ${i18n(navI18n, 'explorer', lang)}`
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
		<a onclick={() => (open = !open)} href="/{i18n(navI18n, 'locale', lang)}/ecosystem">
			{i18n(navI18n, 'ecosystem', lang)}
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
		<ul id="links" class:open={links}>
			<button class="x" onclick={() => (links = false)} aria-label="Close menu"></button>
			{#each linkArr as l (l.url)}
				<li>
					<a target="_blank" rel="noopener noreferrer" href={l.url} onclick={() => (open = !open)}>
						{l.title}
					</a>
				</li>
			{/each}
		</ul>
	</li>

	<li id="tickerBtn">
		<button
			class="links-trigger"
			onclick={() => (ticker = !ticker)}
			onkeydown={(e) => e.key === 'Enter' && (ticker = !ticker)}
		>
			{i18n(navI18n, 'markets', lang)}
		</button>
		<div id="ticker-panel" class:open={ticker}>
			<button class="x" onclick={() => (ticker = false)}>X</button>
			<ul id="market-links">
				{#each marketArr as m (m.url)}
					<li>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={m.url}
							onclick={() => (ticker = false)}
						>
							{m.name}
						</a>
					</li>
				{/each}
			</ul>
			{#if ticker}
				<iframe
					src="/gecko-widget.html"
					sandbox="allow-scripts"
					title="Blackcoin price ticker"
					style="border: none; width: 100%; height: 280px; background: transparent;"
				></iframe>
			{/if}
			<hr />
			<ul id="market-links">
				{#each exchangeList as e (e.url)}
					<li>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={e.url}
							onclick={() => (ticker = false)}
						>
							{e.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
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
		padding: 0.5rem !important;
		margin: 0 auto;
		border-radius: 5%;
	}

	#links {
		display: none;
		position: fixed;
		inset: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--page-bg);
		padding: 3rem 0 1rem;
		z-index: 101;
		font-size: 1rem;
		line-height: 1.5rem;
	}

	#links.open {
		display: flex;
	}

	#tickerBtn {
		padding: 0.5rem !important;
		margin: 0 auto;
		border-radius: 5%;
	}

	#ticker-panel {
		height: fit-content;
		display: none;
		position: fixed;
		inset: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--page-bg);
		padding: 3rem 0 1rem;
		z-index: 101;
	}

	#ticker-panel.open {
		display: flex;
	}

	#market-links {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 1rem;
		line-height: 1.5rem;
	}

	#market-links li a {
		display: block;
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		text-align: center;
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
		background: transparent;
		border: 0;
		position: absolute;
		right: 1rem;
		top: 1rem;
		padding: 15px;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
	}

	.x::before,
	.x::after {
		content: '';
		display: block;
		width: 30px;
		height: 4px;
		background-color: var(--nav-hamburger, white);
		border-radius: 4px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -15px;
		margin-top: -2px;
	}

	.x::before {
		transform: rotate(45deg);
	}

	.x::after {
		transform: rotate(-45deg);
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
			position: relative;
			padding: 0 0.5rem !important;
			margin: 0;
			align-self: center;
			background-image: none;
			border-radius: 0;
		}

		#links {
			display: flex;
			position: absolute;
			top: calc(100% + 0.5rem);
			right: 0;
			left: auto;
			bottom: auto;
			width: max-content;
			min-width: 12rem;
			flex-direction: column;
			justify-content: flex-start;
			flex-wrap: nowrap;
			background-color: var(--surface);
			border: 1px solid var(--glass-border);
			border-radius: 6px;
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
			padding: 0.25rem;
			opacity: 0;
			pointer-events: none;
			transform: scale(0.95) translateY(-4px);
			transform-origin: top right;
			transition:
				opacity var(--t-fast) var(--ease-out),
				transform var(--t-fast) var(--ease-out);
		}

		#links.open {
			opacity: 1;
			pointer-events: auto;
			transform: scale(1) translateY(0);
		}

		#tickerBtn {
			position: relative;
			padding: 0 0.5rem !important;
			margin: 0;
			align-self: center;
			background-image: none;
			border-radius: 0;
		}

		#ticker-panel {
			position: absolute;
			top: calc(100% + 0.5rem);
			right: 0;
			min-width: 350px;
			background-color: var(--surface);
			border: 1px solid var(--glass-border);
			border-radius: 6px;
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
			padding: 0.5rem;
			opacity: 0;
			pointer-events: none;
			transform: scale(0.95) translateY(-4px);
			transform-origin: top right;
			transition:
				opacity var(--t-fast) var(--ease-out),
				transform var(--t-fast) var(--ease-out);
		}

		#ticker-panel.open {
			opacity: 1;
			pointer-events: auto;
			transform: scale(1) translateY(0);
		}

		#market-links li a {
			text-align: left;
		}

		#links li {
			width: 100%;
			padding: 0;
		}

		#links li a {
			display: block;
			padding: 0.5rem 0.75rem;
			border-radius: 4px;
			text-align: left;
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
