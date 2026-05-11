<script>
	import footerI18n from './footer.i18n';

	let { lang } = $props();
	const date = new Date();
</script>

<footer>
	<a href="#home" class="top-link">
		{footerI18n.to_the_top[lang] || footerI18n.to_the_top['en']} ↑
	</a>
	<small>
		&copy; 2014-{date.getFullYear()} Blackcoin.org — {footerI18n.all_rights_reserved[lang] ||
			footerI18n.all_rights_reserved['en']}
	</small>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 0.75rem 1rem;
		background: var(--ink-0);
	}

	.top-link {
		font-size: 0.65rem;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--footer-link);
		transition: color var(--t-fast);
	}

	.top-link:hover {
		color: var(--gold);
	}

	small {
		font-size: 0.6rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		color: var(--footer-small);
	}
</style>
