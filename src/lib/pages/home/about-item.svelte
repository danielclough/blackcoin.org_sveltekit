<script>
	import i18n from '$lib/i18n';
	import aboutI18n from './about.i18n';
	export let lang;
	export let h3;
	export let icon;
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
		style="flex-direction:{side === 'left' ? 'row-reverse' : 'row'};"
	>
		<div class="h3-container">
			<h3>
				{i18n(aboutI18n, h3, lang)}
			</h3>
		</div>
		<div class="ft-icon">
			<i class="icon">{icon}</i>
		</div>
	</div>
	<hr class="hide-on-desktop" id="hr-text" data-content={!!down ? "" : i18n(aboutI18n, a, lang)}>

	{#if down === true || desktop}
		<p>
			{i18n(aboutI18n, p, lang)}
			<br />
			<a href={url}>{i18n(aboutI18n, a, lang)}</a>
		</p>
	{/if}
</div>
<style>
	i {
		font-size: 3rem;
		padding: 0 1rem;
	}
	.container-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.container {
		display: inline-flex;
		justify-content: center;
	}
	h3 {
		margin: 1rem 0;
	}
	.h3-container {
		align-self: center;
	}

	#hr-text {
		margin-top: -.5rem;
		position: relative;
		width: 100%;
		font-size: small;
		outline: 0;
		border: 0;
		text-align: center;
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
		i {
			font-size: 6rem;
			padding: 0 2rem;
		}
	}
</style>
