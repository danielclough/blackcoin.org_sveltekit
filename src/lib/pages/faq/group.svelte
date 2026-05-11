<script>
	import i18n from '$lib/i18n';

	let { lang, As, i, d, j } = $props();
	let open = $state(false);
</script>

<div class="panel">
	<div>
		<h4 class="title golden">
			<button class="title-btn" onclick={() => (open = !open)}>
				<span class="chevron">{open ? '▾' : '▸'}</span>
				<p>{i18n(d.obj, d.key, lang)}</p>
			</button>
		</h4>
		{#if open}
			<div class="body">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html i18n(As[i][j].obj, As[i][j].key, lang)}
			</div>
		{/if}
	</div>
</div>

<style>
	.panel {
		background-color: var(--ink-3);
		box-shadow: 1px 1px 1rem var(--ink-3);
		padding: 1rem;
		margin-bottom: 0.25rem;
	}
	.title {
		margin: 0;
		padding-bottom: 0;
	}
	.title-btn {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		width: 100%;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font: inherit;
		color: inherit;
		text-align: left;
		user-select: none;
	}
	.title-btn:hover {
		color: var(--link-hover);
	}
	.chevron {
		font-size: 0.8em;
		flex-shrink: 0;
	}
	.title-btn p {
		margin: 0;
	}
	.body {
		padding-top: 0.75rem;
		padding-left: 1.25rem;
		border-left: 2px solid var(--border-mid);
		margin-top: 0.5rem;
	}
</style>
