<script>
	import i18n from '$lib/i18n';
	import downloadsI18n from './downloads.i18n';
	export let lang;
	import downloadGroups from './download-groups';
</script>

<div class="bg">
	<section id="services" class="container section ft-boxed-hover">
		<header>
			<h2 class="golden" id="downloads">{i18n(downloadsI18n, 'downloads', lang)}</h2>
			<h3 class="subheading">{i18n(downloadsI18n, 'official_files', lang)}</h3>
		</header>
		<ul class="col-row">
			{#each downloadGroups as dl}
				<li class="item">
					<div class="label">
						<h3>{i18n(downloadsI18n, dl.title, lang)}</h3>
					</div>
					{#each dl.links as link}
						<a href={link.url}>
							<div class="content">
								{#if link.img}
									<picture>
										{#if link.img.split('.')[1] !== 'svg'}
											<source srcset={link.img.split('.')[0] + '.webp'} type="image/webp" />
										{/if}
										<source srcset={link.img} type="image/png" />
										<img height={link.height} width={link.width} src={link.img} alt={link.alt} />
									</picture>
								{/if}
								<p>
									<span style="color: #aaa;">{link.alt}</span>
								</p>
							</div>
							{#if !!dl.subtitle}
								<p class="pd-15px">{i18n(downloadsI18n, dl.subtitle, lang)}</p>
							{/if}
						</a>
					{/each}
				</li>
				<br />
			{/each}
		</ul>
	</section>
</div>

<style>
	img {
		width: 50%;
		height: auto;
	}
	h3 {
		font-size: 100%;
	}
	.bg {
		max-width: 95%;
		margin: 0 auto;
		background: url('/images/hero/tri.webp');
		background-size: cover;
		background-position: 50%;
		background-attachment: fixed;
	}
	.col-row {
		width: 90%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		text-align: center;
		margin: 1rem auto;
	}
	.subheading {
		text-align: center;
		margin: 0 auto;
		width: 50%;
		font-size: x-large;
	}
	.item {
		margin: 1rem auto;
		width: 100%;
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: 1px solid goldenrod;
	}
	a {
		justify-self: center;
	}

	@media (min-width: 700px) {
		.bg {
			max-width: 90%;
		}
		.container {
			padding: 5% 0;
		}
		.col-row {
			flex-direction: row;
		}
		.item {
			width: calc(50% - 2rem);
			margin: 1rem;
		}
	}
	@media (min-width: 1440px) {
		.bg {
			max-width: 80%;
		}
		.item {
			width: calc(25% - 2rem);
			margin: 1rem;
		}
	}
	@media (min-width: 2560px) {
		.bg {
			max-width: 70%;
		}
	}
</style>
