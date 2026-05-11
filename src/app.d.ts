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
