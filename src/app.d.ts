// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {}

declare namespace svelteHTML {
	interface IntrinsicElements {
		'gecko-coin-ticker-widget': {
			locale?: string;
			'dark-mode'?: string;
			'transparent-background'?: string;
			'coin-id'?: string;
			'initial-currency'?: string;
		};
	}
}

declare class QRCode {
	constructor(
		element: string | HTMLElement,
		options: {
			text?: string;
			width?: number;
			height?: number;
			colorDark?: string;
			colorLight?: string;
			correctLevel?: number;
		}
	): void;
	static CorrectLevel: { L: number; M: number; Q: number; H: number };
}

interface Window {
	QRCode?: typeof QRCode;
}
