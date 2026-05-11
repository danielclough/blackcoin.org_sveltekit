<script lang="ts">
	import type { Icon } from './about-items';
	import i18n from '$lib/i18n';
	import aboutI18n from './about.i18n';

	interface Props {
		lang: string;
		h3: string;
		a: string;
		p: string;
		url: string;
		side: string;
		desktop: boolean;
		icon: Icon;
	}

	let { lang, h3, a, p, url, side, desktop, icon }: Props = $props();
	let down = $state(false);
</script>

<div
	class="container-container"
	role="button"
	tabindex={desktop ? -1 : 0}
	onclick={() => (desktop || !!down ? (down = false) : (down = true))}
	onkeydown={(e) => !desktop && e.key === 'Enter' && (down = !down)}
>
	<div
		class="container"
		style="flex-direction:{side === 'left' ? 'row' : 'row-reverse'}; --h3-align:{side === 'left'
			? 'right'
			: 'left'};"
	>
		<div class="h3-container">
			<h3>
				{i18n(aboutI18n, h3, lang)}
			</h3>
		</div>
		<div class="ft-icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 {icon.w} {icon.h}"
				fill="currentColor"
				aria-hidden="true"
				focusable="false"
				class="icon"><path d={icon.path} /></svg
			>
		</div>
	</div>
	<hr
		class="hide-on-desktop"
		id="hr-text"
		style="text-align:{side === 'left' ? 'right' : 'left'};"
		data-content={down ? '' : i18n(aboutI18n, a, lang)}
	/>

	{#if down === true || desktop}
		<p>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html i18n(aboutI18n, p, lang)}
			<br />
			<a href={url}>{i18n(aboutI18n, a, lang)}</a>
		</p>
	{/if}
</div>

<style>
	a {
		justify-self: start;
	}
	.ft-icon {
		justify-self: center;
		align-self: center;
		padding: 0 1rem;
	}
	.icon {
		width: 1.5rem;
		height: 1.5rem;
	}
	.container-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.container {
		display: flex;
		width: 100%;
	}
	h3 {
		margin: 1rem 0;
		font-size: 1em;
		letter-spacing: 2px;
		font-family: sans-serif;
		font-weight: 100;
		text-align: var(--h3-align, left);
	}
	p {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			Segoe UI,
			Roboto,
			Helvetica,
			Arial,
			sans-serif,
			Apple Color Emoji,
			Segoe UI Emoji;
		font-size: 16px;
		letter-spacing: 0.2px;
		line-height: 1.8em;
	}
	p :global(strong) {
		color: var(--about-strong);
		font-weight: 600;
	}
	.h3-container {
		flex: 1;
		align-self: center;
	}

	#hr-text {
		margin-top: -0.5rem;
		position: relative;
		width: 60%;
		font-size: small;
		outline: 0;
		border: 0;
		opacity: 0.6;
	}
	#hr-text:before {
		content: '';
		background: linear-gradient(to right, transparent, var(--about-hr-gradient), transparent);
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
	}
	#hr-text:after {
		content: attr(data-content);
		color: var(--about-hr-text);
	}

	@media (min-width: 1080px) {
		.hide-on-desktop {
			display: none;
		}
	}
	@media (min-width: 1440px) {
		.container-container {
			width: 80%;
			margin: 0 auto;
		}
	}
	@media (min-width: 2560px) {
		.container-container {
			width: 60%;
		}
	}
</style>
