import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({ precompress: true }),
	    csp: {
			directives: {
				'script-src-elem': ['tmp.blackcoin.one', 'unsafe-inline', 'sidecar.gitter.im']
			}
		}
	}
};

export default config;
