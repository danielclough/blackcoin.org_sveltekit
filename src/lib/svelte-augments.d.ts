export {};

declare module 'svelte/elements' {
	interface HTMLSourceAttributes {
		fetchpriority?: 'auto' | 'high' | 'low' | undefined | null;
	}
}
