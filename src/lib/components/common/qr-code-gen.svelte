<script>
	/* global QRCode */
	import { onMount } from 'svelte';

	export let value;
	export let size;

	function initQR() {
		new QRCode(value, {
			text: value,
			width: size,
			height: size,
			colorDark: '#000000',
			colorLight: '#ffffff',
			correctLevel: QRCode.CorrectLevel.L
		});
	}

	onMount(() => {
		if (window.QRCode) {
			initQR();
		} else {
			const script = document.createElement('script');
			script.src = '/js/qrcode.min.js';
			script.onload = initQR;
			document.head.append(script);
		}
	});
</script>

<div id={value} class="qrcode"></div>

<style>
	.qrcode {
		display: flex;
		justify-content: center;
	}
</style>
