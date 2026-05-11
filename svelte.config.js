import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({ precompress: true }),
		csp: {
			directives: {
				'script-src-elem': ['self']
			}
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Suppress 404s for missing .webp files — browser falls back to original format
				if (path.endsWith('.webp')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
