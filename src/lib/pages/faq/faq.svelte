<script>
	import i18n from '$lib/i18n';
	import layout from './faq-layout.i18n';
	import generalI18n from './general.i18n';
	import walletI18n from './wallet.i18n';
	import otherI18n from './other.i18n';
	import Group from './group.svelte';
	export let lang;

	const doThese = [generalI18n, walletI18n, otherI18n];
	const titles = [];
	const Qs = Array.from({ length: doThese.length }, () => []);
	const As = Array.from({ length: doThese.length }, () => []);
	let itterator = 0;
	for (let [i, x] of doThese.entries()) {
		const { TITLE, SUBTITLE, qa } = x;
		titles.push({ TITLE, SUBTITLE });
		for (let [key, obj] of Object.entries(qa)) {
			if (itterator % 2 === 0) {
				Qs[i].push({ obj, key });
			} else {
				As[i].push({ obj, key });
			}
			itterator++;
		}
	}
</script>

<h1>{i18n(layout, 'GENERAL_QUESTIONS', lang)}</h1>
<h2>{i18n(layout, 'FREQUENTLY_ASKED_QUESTIONS', lang)}</h2>
<div class="container">
	{#each titles as faq, i (faq.TITLE)}
		<div class="inner">
			<div>
				<h3>{i18n(faq, 'TITLE', lang)}</h3>
				<p>{i18n(faq, 'SUBTITLE', lang)}</p>
			</div>

			<div class="panel-group">
				{#each Qs[i] as d, j (d.key)}
					<Group {lang} {As} {d} {i} {j} />
				{/each}
			</div>
			<hr />
		</div>
	{/each}
	<span class="faq-contact-links">
		If you have more questions, join us on
		<a href="https://discord.blackcoin.nl" target="_blank" rel="noopener noreferrer">Discord</a>.
	</span>
</div>

<style>
	h1 {
		padding-top: 6rem;
	}
	h1,
	h2 {
		text-align: center;
	}
	.container {
		padding: 1rem;
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	@media (min-width: 1080px) {
		.inner {
			padding: 1rem;
			width: 40vw;
		}
		.inner:nth-child(3) {
			width: 85%;
		}
	}
</style>
