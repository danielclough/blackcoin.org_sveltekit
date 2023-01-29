<script>
	import i18n from '$lib/i18n';
	import heroI18n from './hero.i18n';
	import BreakingNews from './news.svelte';
	import HeroAnimation from './hero-animation.svelte';

	export let lang;
	export let width;
</script>

{#if width > 700}
	<div id="large-header">
		<HeroAnimation />
	</div>
{/if}
<div class="hero">
	<div class="bg-overlay">
		<div class="content-wrapper">
			<div class="content">
<!-- Inline SVG -->
<svg
   version="1.1"
   width="150px"
   height="150px"
   viewBox="0 0 587 587"
   id="svg89"
   xmlns="http://www.w3.org/2000/svg"
>
  <defs
     id="defs60">
    <linearGradient
       id="e"
       x1="-136.85"
       x2="217.91"
       y1="251.43"
       y2="251.43"
       gradientUnits="userSpaceOnUse">
      <stop
         stop-color="#3d383d"
         offset="0"
         id="stop2" />
      <stop
         stop-color="#3d383d"
         stop-opacity="0"
         offset="1"
         id="stop4" />
    </linearGradient>
    <filter
       id="g"
       x="-1.1980545"
       y="-0.88013185"
       width="3.396109"
       height="2.7602637"
       color-interpolation-filters="sRGB">
      <feGaussianBlur
         stdDeviation="177.09801"
         id="feGaussianBlur7" />
    </filter>
    <linearGradient
       id="d"
       x1="-281.77"
       x2="81.053"
       y1="206.74"
       y2="206.74"
       gradientTransform="matrix(.98083 0 0 .97776 1.5537 9.7739)"
       gradientUnits="userSpaceOnUse">
      <stop
         stop-color="#787978"
         offset="0"
         id="stop10" />
      <stop
         stop-color="#787978"
         stop-opacity="0"
         offset="1"
         id="stop12" />
    </linearGradient>
    <filter
       id="f"
       x="-0.055352236"
       y="-0.043293881"
       width="1.1107045"
       height="1.0865878"
       color-interpolation-filters="sRGB">
      <feGaussianBlur
         stdDeviation="8.2074598"
         id="feGaussianBlur15" />
    </filter>
    <meshgradient
       id="b"
       x="-318.85208"
       y="-57.554688"
       gradientUnits="userSpaceOnUse">
      <meshrow
         id="meshrow28">
        <meshpatch
           id="meshpatch26">
          <stop
             stop-color="#fff"
             path="c 193.333,0  386.667,0  580,0"
             id="stop18" />
          <stop
             stop-color="#ffe680"
             path="c 0,193.333  0,386.667  0,580"
             id="stop20" />
          <stop
             stop-color="#fff"
             path="c -193.333,0  -386.667,0  -580,0"
             id="stop22" />
          <stop
             stop-color="#ffe680"
             path="c 0,-193.333  0,-386.667  0,-580"
             id="stop24" />
        </meshpatch>
      </meshrow>
    </meshgradient>
    <meshgradient
       id="a"
       x="-282"
       y="-23"
       gradientUnits="userSpaceOnUse">
      <meshrow
         id="meshrow41">
        <meshpatch
           id="meshpatch39">
          <stop
             stop-color="#fff"
             path="c 170.667,0  341.333,0  512,0"
             id="stop31" />
          <stop
             stop-color="#262524"
             path="c 0,170.667  0,341.333  0,512"
             id="stop33" />
          <stop
             stop-color="#fff"
             path="c -170.667,0  -341.333,0  -512,0"
             id="stop35" />
          <stop
             stop-color="#262524"
             path="c 0,-170.667  0,-341.333  0,-512"
             id="stop37" />
        </meshpatch>
      </meshrow>
    </meshgradient>
    <filter
       id="h"
       x="-0.010971913"
       y="-0.010971913"
       width="1.0219438"
       height="1.0219438"
       color-interpolation-filters="sRGB">
      <feGaussianBlur
         stdDeviation="2.3406749"
         id="feGaussianBlur44" />
    </filter>
    <meshgradient
       id="c"
       x="-302"
       y="-41"
       gradientUnits="userSpaceOnUse">
      <meshrow
         id="meshrow57">
        <meshpatch
           id="meshpatch55">
          <stop
             stop-color="#fff"
             path="c 182.667,0  365.333,0  548,0"
             id="stop47" />
          <stop
             path="c 0,182.667  0,365.333  0,548"
             id="stop49" />
          <stop
             stop-color="#fff"
             path="c -182.667,0  -365.333,0  -548,0"
             id="stop51" />
          <stop
             path="c 0,-182.667  0,-365.333  0,-548"
             id="stop53" />
        </meshpatch>
      </meshrow>
    </meshgradient>
  </defs>
  <g
     transform="matrix(1.0079 0 0 1.007 322.52 59.838)"
     id="g86">
    <g
       stroke="#deb354"
       id="g68">
      <path
         d="m-29.624-59.593c-160.43-2e-5 -290.77 130.46-290.77 291.02-8e-5 160.56 130.35 291.02 290.77 291.02 160.43 1e-5 290.77-130.46 290.77-291.02 8e-5 -160.56-130.35-291.02-290.77-291.02zm-0.40106 21.074c145.39 0 263.7 119.42 263.7 267.94 0 147.52-118.31 267.94-263.7 267.94-145.39 0-263.7-119.42-263.7-267.94 0-147.52 118.31-267.94 263.7-267.94z"
         fill="url(#b)"
         stroke-width=".30093"
         style="mix-blend-mode:overlay"
         id="path62" />
      <path
         d="m-29-58c-160-2e-5 -290 130-290 290-8e-5 160 130 290 290 290 160 1e-5 290-130 290-290 8e-5 -160-130-290-290-290zm-0.4 21c145 0 263 119 263 267 0 147-118 267-263 267s-263-119-263-267c0-147 118-267 263-267z"
         fill="#f7dd6b"
         stroke-width=".3"
         id="path64" />
      <ellipse
         cx="-28"
         cy="232.99"
         rx="272"
         ry="274"
         fill="#1a1a1a"
         stroke-width=".3"
         id="ellipse66" />
    </g>
    <path
       d="m108.29 9.9735a231.05 259.45 12.215 0 1 109.51 221.15 231.05 259.45 12.215 0 1-122.82 225.54 231.05 259.45 12.215 0 1-231.84 3.4944l122.82-225.54z"
       fill="url(#e)"
       filter="url(#g)"
       opacity=".22708"
       stroke-width="317.37"
       style="mix-blend-mode:screen"
       id="path70" />
    <path
       d="m-148 72v4s33 9 33 58v149c0 58-33 62-33 62v5l54-3v-273zm118 0.7c-13 6e-3 -24 2-44 2v272s44 3 68 3c24-0.2 60-16 67-60s-11-64-20-72c-9-7-34-16-34-16 0-1e-5 17-8 24-20 8-12 14-34 8-58-6-23-26-47-50-50-6-0.8-11-1-16-1-0.9-0.02-2-0.03-3-0.03zm59 7s30 20 31 59c0.7 40-15 55-15 55s39-13 39-58c-0.7-45-54-57-54-57zm-31 22c21 15 26 57 9 80s-61 17-61 17-0.2-95 4-99c14.612-8.6926 33.093-8.8268 48 2zm58 107c-3e-6 0 24 21 25 65 1 45-25 67-25 67-3e-6 0 50-14 49-67-0.6-53-49-65-49-65zm-102 7c14-0.2 44 0.09 56 5v8e-3c16 7 37 31 27 70s-41 40-57 39c-16-0.6-31-0.4-33-45-2-45-1-69-1-69s3-0.1 8-0.2z"
       fill="#d7a93c"
       stroke="#deb354"
       stroke-width=".4"
       id="path72" />
    <g
       id="g80">
      <path
         d="m-28-41c-151-2e-5 -274 123-274 274-8e-5 151 123 274 274 274 151 2e-5 274-123 274-274 8e-5 -151-123-274-274-274zm-0.4 20c137 0 249 113 249 252s-111 252-249 252c-137 0-249-113-249-252s111-252 249-252z"
         fill="url(#c)"
         stroke="#deb354"
         stroke-opacity=".05"
         stroke-width=".3"
         style="mix-blend-mode:multiply"
         id="path74" />
      <path
         d="m-149.31 439.41a244.24 239.83 66.272 0 1-125.44-209.36 244.24 239.83 66.272 0 1 115.41-212.08 244.24 239.83 66.272 0 1 240.39-1.8777l-115.41 212.08z"
         fill="url(#d)"
         filter="url(#f)"
         opacity=".2668"
         stroke-width="311.87"
         style="mix-blend-mode:luminosity"
         id="path76" />
      <path
         d="m-26-23c-141-2e-5 -256 115-256 256-8e-5 142 115 256 256 256 141 1e-5 256-115 256-256 7e-5 -142-115-256-256-256zm-0.4 19c128 0 233 106 233 236s-104 236-233 236c-128 0-233-106-233-236s104-236 233-236z"
         fill="url(#a)"
         filter="url(#h)"
         opacity=".83346"
         style="mix-blend-mode:soft-light"
         id="path78" />
    </g>
    <text
       x="-155.06726"
       y="410.41968"
       fill="#d7a93c"
       font-family="sans-serif"
       font-size="42.333px"
       stroke-width=".26458"
       style="line-height:1.25"
       xml:space="preserve"
       id="text84"><tspan
         x="-155.06726"
         y="410.41968"
         fill="#d7a93c"
         font-family="cmr10"
         font-size="42.333px"
         stroke-width=".26458"
         id="tspan82">BLACKCOIN</tspan></text>
  </g>
</svg>

				<h1 class="title">
					{i18n(heroI18n, 'blackcoin', lang)}
				</h1>
				<!-- <a href="#community" class="join-community">
					<img
					id="cta"
					height="176"
					width="550"
					src="/images/hero/banner.svg"
					alt="Join the Blackcoin Community!"
					/>
				</a> -->
				<hr />
				<h2 class="subtitle">{i18n(heroI18n, 'since2014', lang)}</h2>
			</div>
			<br />
			<BreakingNews {lang} />
			<br />
		</div>
	</div>
</div>

<style>
	@font-face {
	font-family: 'cmr10';
		src: url('/fonts/cmr10.ttf');
	}
	hr {
		margin: 1.5rem;
		color: transparent;
		border: none;
	}
	.hero {
		background: url('/images/hero/tri.webp');
		background-size: cover;
		background-position: 50%;
		background-attachment: fixed;
	}
	.bg-overlay {
		background: rgba(17, 17, 17, 0.5);
		overflow: hidden;
		height: 100vh;
	}
	.hero .content-wrapper .content {
		text-align: center;
		padding-top: 4rem;
	}
	.hero {
		color: #ececec;
	}
	svg {
		padding-top: 15%;
		height: auto;
	}
	#large-header {
		position: absolute;
		margin: o auto;
	}
	.title {
		margin-bottom: 0;
		letter-spacing: 10px;
	}
	.subtitle {
		margin: 0;
		letter-spacing: 10px;
		font-size: 1.3rem;
	}

	@media (min-width: 700px) {
		svg {
			padding-top: 30%;
			width: 25%;
		}
	}
	@media (min-width: 1080px) {
		svg {
			padding-top: 8%;
			width: 18%;
		}
	}
</style>
