import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({ precompress: true }),
		paths: {
			base: process.env.BASE_PATH ?? ''
		},
		csp: {
			directives: {
				'script-src-elem': [
					'self',
					'https://widgets.coingecko.com',
					'sha256-esZRzsFyTen/O5P2L7hWUdF4JqZn+/qPwDXg6kfxpIE=',
					'sha256-L28lVkJa/bb8VtH7HuLeNQxNMQkE4sEIyD9a448xE1Q='
				]
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
