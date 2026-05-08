<script>
	import AddrQr from '../../components/common/addr-qr.svelte';
	import donationsI18n from './donations.i18n';
	import ongoing from './ongoing';
	import community from './community';
	import outreach from './outreach';
	import development from './development';

	const projects = [...development, ...outreach, ...ongoing, ...community];
	export let lang = 'en';
	export let width;
	let qr = '';
	$: intro = donationsI18n.support_donate[lang] || donationsI18n.support_donate['en'];
</script>

<h1>Donations</h1>
<p class="intro">{intro}</p>
<div class="grid">
	{#each projects as group (group.name)}
		<h2>{group.name}</h2>
		<div class="group">
			{#each group.items as item (item.title)}
				<div class="items">
					<h3 class="title">{item.title}</h3>
					<div class="content">
						<ul>
							{#if item.links.length > 0}
								{#each item.links as link (link.url)}
									<li>
										<a href={link.url} class="link-btn">{link.link_content}</a>
									</li>
								{/each}
							{/if}
						</ul>
						<div class="addr">
							<AddrQr address={item.address} {width} {qr} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	h1 {
		text-align: center;
		padding-top: 6rem;
	}
	.intro {
		text-align: center;
		color: var(--proj-intro);
		font-size: 1rem;
		max-width: 640px;
		margin: 0 auto 1rem;
		padding: 0 1rem;
	}
	h2 {
		color: var(--proj-h2);
		letter-spacing: 2px;
		border-bottom: 1px solid var(--proj-h2-border);
		padding-bottom: 0.5rem;
		width: 100%;
		text-align: center;
	}
	h3 {
		color: var(--proj-h3);
		font-size: 1rem;
		letter-spacing: 1px;
	}
	li {
		font-size: 0.9rem;
		padding: 0.2rem 0;
	}
	a {
		color: var(--proj-h2);
	}
	a:hover {
		color: var(--link-hover);
	}
	.addr {
		margin-top: 0.75rem;
	}
	.grid {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		margin: 0 auto;
		gap: 2rem;
		padding-bottom: 4rem;
	}
	.group {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
		width: 100%;
	}
	.items {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 1.25rem;
		width: 100%;
		background-color: var(--proj-item-bg);
		border: 1px solid var(--proj-item-border);
		transition: border-color 0.3s;
	}
	.items:hover {
		border-color: var(--proj-item-hover);
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	ul {
		padding: 0;
		margin: 0.5rem 0;
	}
	@media (min-width: 700px) {
		.items {
			width: calc(45% - 1rem);
		}
	}
	@media (min-width: 1080px) {
		.items {
			width: calc(30% - 1rem);
		}
	}
</style>
