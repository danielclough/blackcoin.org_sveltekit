import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createTheme() {
	const { subscribe, set } = writable<'dark' | 'light'>('dark');
	return {
		subscribe,
		init() {
			if (!browser) return;
			const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
			const val = saved ?? 'dark';
			document.documentElement.setAttribute('data-theme', val);
			set(val);
		},
		toggle() {
			if (!browser) return;
			const cur = document.documentElement.getAttribute('data-theme') ?? 'dark';
			const next: 'dark' | 'light' = cur === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', next);
			localStorage.setItem('theme', next);
			set(next);
		}
	};
}

export const theme = createTheme();
