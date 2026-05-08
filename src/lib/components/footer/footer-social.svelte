<script>
	import footerLinks from './footer-links';
</script>

<div class="social">
	{#each footerLinks as s (s.url)}
		<a target="_blank noreferrer" href={s.url}>
			{s.alt}
		</a>
	{/each}
</div>

<style>
	.social {
		display: inline-flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0;
	}
	a {
		padding: 0.4rem 0.75rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1.3px;
		color: var(--footer-social);
		border-right: 1px solid var(--footer-sep);
	}
	a:last-child {
		border-right: none;
	}
	a:hover {
		color: var(--gold);
	}
	@media (min-width: 1080px) {
		.social {
			width: 70%;
			margin: 0 auto;
		}
	}
</style>
