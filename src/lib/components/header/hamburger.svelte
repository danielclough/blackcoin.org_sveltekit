<script lang="ts">
	interface Props {
		open?: boolean;
		onclick?: () => void;
	}

	let { open = $bindable(false), onclick = undefined }: Props = $props();

	function handleClick() {
		open = !open;
		onclick?.();
	}
</script>

<button
	class="hamburger"
	class:is-active={open}
	onclick={handleClick}
	aria-label={open ? 'Close menu' : 'Open menu'}
	aria-expanded={open}
>
	<span class="box"><span class="inner"></span></span>
</button>

<style>
	.hamburger {
		padding: 15px;
		cursor: pointer;
		background: transparent;
		border: 0;
		display: inline-flex;
		align-items: center;
	}
	.box {
		width: 30px;
		height: 24px;
		display: inline-block;
		position: relative;
	}
	.inner,
	.inner::before,
	.inner::after {
		width: 30px;
		height: 4px;
		background-color: var(--nav-hamburger, white);
		border-radius: 4px;
		position: absolute;
	}
	.inner {
		top: 50%;
		margin-top: -2px;
		transition: transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
	}
	.inner::before,
	.inner::after {
		content: '';
		display: block;
	}
	.inner::before {
		top: -10px;
		transition:
			top 0.1s 0.25s ease-in,
			opacity 0.1s ease-in;
	}
	.inner::after {
		bottom: -10px;
		transition:
			bottom 0.1s 0.25s ease-in,
			transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
	}
	.is-active .inner {
		transform: rotate(225deg);
		transition-delay: 0.12s;
		transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	.is-active .inner::before {
		top: 0;
		opacity: 0;
		transition:
			top 0.1s ease-out,
			opacity 0.1s 0.12s ease-out;
	}
	.is-active .inner::after {
		bottom: 0;
		transform: rotate(-90deg);
		transition:
			bottom 0.1s ease-out,
			transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
</style>
