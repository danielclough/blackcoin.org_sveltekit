<script>
	import { icon, config } from '@fortawesome/fontawesome-svg-core';
	import i18n from '$lib/i18n';
	import aboutI18n from './about.i18n';
	export let lang;
	export let h3;
	export let faIcon;
	export let a;
	export let p;
	export let url;
	export let side;
	export let desktop;
	export let down = false;
</script>

<div class="container-container"
	on:click={()=>desktop || !!down ? down = false : down = true}
>
	<div 
		class="container"
		style="flex-direction:{side === 'left' ? 'row' : 'row-reverse'};"
	>
		<div class="h3-container">
			<h3>
				{i18n(aboutI18n, h3, lang)}
			</h3>
		</div>
		<div class="ft-icon">
			{ @html icon(faIcon).html }
		</div>
	</div>
	<hr class="hide-on-desktop" id="hr-text" style="text-align:{side === 'left' ? 'right' : 'left'};" data-content={!!down ? "" : i18n(aboutI18n, a, lang)}>

	{#if down === true || desktop}
		<p>
			{i18n(aboutI18n, p, lang)}
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
		font-size: 1.5em;
	}
	.container-container {
		display: flex;
		flex-direction: column;
	}
	.container {
		display: inline-flex;
		justify-content: center;
	}
	h3 {
		margin: 1rem 0;
		font-size: 1em;
  		letter-spacing: 2px;
		font-family: sans-serif;
		font-weight: 100;
	}
	p {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
		font-size: 16px;
		letter-spacing: 0.2px;
		line-height: 1.8em;
	}
	.h3-container {
		align-self: center;
	}

	#hr-text {
		margin-top: -.5rem;
		position: relative;
		width: 60%;
		font-size: small;
		outline: 0;
		border: 0;
		opacity: 0.6;
	}
	#hr-text:before {
		content: '';
		background: linear-gradient(to right, transparent, #ff0, transparent);
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
	}
	#hr-text:after {
		content: attr(data-content);
		color: #ffa;
		opacity: 0.5;
	}
	
	@media (min-width: 700px) {
		i {
			font-size: 4rem;
		}
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
