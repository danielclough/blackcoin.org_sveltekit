<script>
	let { locales } = $props();
</script>

{#each locales as locale (locale.code)}
	<a style="display:none;" hreflang={locale.code} href="/{locale.code}/donations"
		>/{locale.code}/donations</a
	>
	<a style="display:none;" hreflang={locale.code} href="/{locale.code}/faq">/{locale.code}/faq</a>
{/each}
