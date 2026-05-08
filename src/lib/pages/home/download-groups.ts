interface DownloadLink {
	url: string;
	label: string;
	alt?: string;
	img?: string;
	height?: string;
	width?: string;
}

interface DownloadGroup {
	title: string;
	subtitle?: string;
	links: DownloadLink[];
}

const downloadGroups: DownloadGroup[] = [
	{
		title: 'more_wallet',
		subtitle: 'community_supported',
		links: [
			{
				url: 'https://blackcoinmore.org',
				label: 'Blackcoin More v26.2.0',
				alt: 'Blackcoin More logo',
				img: '/images/logo-more-bw-sm.png',
				height: '100',
				width: '100'
			}
		]
	},
	{
		title: 'electrum',
		subtitle: 'electrum_text',
		links: [
			{
				url: 'https://github.com/CoinBlack/electrum-blk/releases/tag/v4.5.8',
				label: 'Electrum-BLK v4.5.8',
				alt: 'Electrum-BLK logo',
				img: '/images/downloads/elecblk.png',
				height: '100',
				width: '100'
			}
		]
	},
	{
		title: 'mobile_wallets',
		links: [
			{
				url: 'https://coinomi.com/',
				label: 'Coinomi',
				alt: 'Coinomi logo',
				img: '/images/downloads/coinomi.png',
				height: '100',
				width: '175'
			}
		]
	},
	{
		title: 'dex',
		subtitle: 'dex_text',
		links: [
			{
				url: 'https://komodoplatform.com/en/downloads/',
				label: 'Komodo Wallet',
				alt: 'Komodo Wallet logo',
				img: '/images/exchanges/komodo-wallet-light.svg',
				height: '66',
				width: '240'
			}
		]
	},
	{
		title: 'blackhalo',
		links: [
			{
				url: 'https://blackhalo.info/',
				label: 'BlackHalo',
				alt: 'BlackHalo logo',
				img: '/images/blackhalo2.png',
				height: '100',
				width: '100'
			}
		]
	},
	{
		title: 'gitlab_source',
		links: [
			{
				url: 'https://gitlab.com/blackcoin/',
				label: 'Blackcoin on GitLab'
			}
		]
	}
];

export default downloadGroups;
