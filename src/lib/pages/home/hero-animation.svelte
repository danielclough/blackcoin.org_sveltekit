<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		// Circular ease-in-out — identical curve to GSAP's Circ.easeInOut
		function circEaseInOut(t) {
			if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
			return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
		}

		// Minimal tween engine replacing TweenLite
		const tweens = [];

		function tweenTo(target, duration, { x, y, ease, onComplete }) {
			tweens.push({
				target,
				startX: target.x,
				startY: target.y,
				endX: x,
				endY: y,
				duration: duration * 1000,
				startTime: performance.now(),
				ease: ease || ((t) => t),
				onComplete
			});
		}

		function updateTweens() {
			const now = performance.now();
			for (let i = tweens.length - 1; i >= 0; i--) {
				const tw = tweens[i];
				const progress = Math.min((now - tw.startTime) / tw.duration, 1);
				const ep = tw.ease(progress);
				tw.target.x = tw.startX + (tw.endX - tw.startX) * ep;
				tw.target.y = tw.startY + (tw.endY - tw.startY) * ep;
				if (progress >= 1) {
					tweens.splice(i, 1);
					tw.onComplete?.();
				}
			}
		}

		let rafId = -1;
		let mouseFn, resizeFn;
		let s, u, g, m, w, f, h, v;
		let lastInteraction = 0;
		let driftAngle = 0;
		let wasIdle = false;

		// Scale vars — calibrated so 700px width matches the original values:
		// wander=50, t1≈4000, t2≈20000, t3≈40000
		let wander, t1, t2, t3;

		function computeScaleVars() {
			wander = s / 14; // 700/14 = 50 at reference width
			t1 = s * s * 0.008; // ≈ 4000 at 700px
			t2 = s * s * 0.04; // ≈ 20000 at 700px
			t3 = s * s * 0.08; // ≈ 40000 at 700px
		}

		function init() {
			s = window.innerWidth;
			u = window.innerHeight;
			g = { x: s / 2, y: u / 2 };
			m = { x: s / 2, y: u / 2 };
			w = document.getElementById('large-header');
			w.style.height = u + 'px';
			f = document.getElementById('demo-canvas');
			f.width = s;
			f.height = u;
			h = f.getContext('2d');
			v = [];

			for (let ex = 0; ex < s; ex += s / 18) {
				for (let ey = 0; ey < u; ey += u / 18) {
					const tx = ex + (Math.random() * s) / 18;
					const ty = ey + (Math.random() * u) / 18;
					v.push({ x: tx, originX: tx, y: ty, originY: ty });
				}
			}

			// Find 5 closest neighbours for each point
			for (let a = 0; a < v.length; a++) {
				const closest = [];
				const pt = v[a];
				for (let b = 0; b < v.length; b++) {
					const other = v[b];
					if (pt === other) continue;
					let placed = false;
					for (let k = 0; k < 5; k++) {
						if (!placed && closest[k] == null) {
							closest[k] = other;
							placed = true;
							break;
						}
					}
					for (let k = 0; k < 5; k++) {
						if (!placed && dist2(pt, other) < dist2(pt, closest[k])) {
							closest[k] = other;
							break;
						}
					}
				}
				pt.closest = closest;
			}

			for (const pt of v) {
				pt.circle = new Circle(pt, 2 + 2 * Math.random(), 'rgba(255,255,255,0.3)');
			}
		}

		function addListeners() {
			if (!('ontouchstart' in window)) {
				mouseFn = (e) => {
					lastInteraction = performance.now();
					m.x =
						e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					m.y = e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				};
				window.addEventListener('mousemove', mouseFn);
			}
			resizeFn = () => {
				s = window.innerWidth;
				u = window.innerHeight;
				w.style.height = u + 'px';
				f.width = s;
				f.height = u;
				computeScaleVars();
			};
			window.addEventListener('resize', resizeFn);
		}

		function startAnimating() {
			drawLoop();
			for (const pt of v) animatePoint(pt);
		}

		function drawLoop() {
			// Drift cursor in a slow figure-8 when idle — starts immediately on mobile
			if (performance.now() - lastInteraction > 500) {
				if (!wasIdle) {
					// Find the angle on the figure-8 path closest to the current g position
					let bestAngle = driftAngle,
						bestDist = Infinity;
					for (let a = 0; a < Math.PI * 2; a += Math.PI / 100) {
						const dx = s / 2 + Math.cos(a * 0.7) * s * 0.3 - g.x;
						const dy = u / 2 + Math.sin(a) * u * 0.25 - g.y;
						const d = dx * dx + dy * dy;
						if (d < bestDist) {
							bestDist = d;
							bestAngle = a;
						}
					}
					driftAngle = bestAngle;
					wasIdle = true;
				}
				driftAngle += 0.007;
				const tx = s / 2 + Math.cos(driftAngle * 0.7) * s * 0.3;
				const ty = u / 2 + Math.sin(driftAngle) * u * 0.25;
				g.x += (tx - g.x) * 0.02;
				g.y += (ty - g.y) * 0.02;
			} else {
				wasIdle = false;
				g.x += (m.x - g.x) * 0.04;
				g.y += (m.y - g.y) * 0.04;
			}
			updateTweens();
			h.clearRect(0, 0, s, u);
			for (const pt of v) {
				const d = dist2(g, pt);
				if (d < t1) {
					pt.active = 0.3;
					pt.circle.active = 0.6;
				} else if (d < t2) {
					pt.active = 0.1;
					pt.circle.active = 0.3;
				} else if (d < t3) {
					pt.active = 0.02;
					pt.circle.active = 0.1;
				} else {
					pt.active = 0;
					pt.circle.active = 0;
				}
				drawLines(pt);
				pt.circle.draw();
			}
			rafId = requestAnimationFrame(drawLoop);
		}

		function animatePoint(pt) {
			tweenTo(pt, 1 + Math.random(), {
				x: pt.originX - wander + 2 * wander * Math.random(),
				y: pt.originY - wander + 2 * wander * Math.random(),
				ease: circEaseInOut,
				onComplete: () => animatePoint(pt)
			});
		}

		function drawLines(pt) {
			if (!pt.active) return;
			for (const nb of pt.closest) {
				h.beginPath();
				h.moveTo(pt.x, pt.y);
				h.lineTo(nb.x, nb.y);
				h.strokeStyle = `rgba(235,235,235,${pt.active})`;
				h.stroke();
			}
		}

		function Circle(pos, radius, color) {
			this.pos = pos;
			this.radius = radius;
			this.color = color;
			this.active = 0;
			this.draw = function () {
				if (!this.active) return;
				h.beginPath();
				h.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
				h.fillStyle = `rgba(255,255,255,${this.active})`;
				h.fill();
			};
		}

		function dist2(a, b) {
			return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
		}

		init();
		computeScaleVars();
		addListeners();
		startAnimating();

		// Fully cancel RAF when the canvas scrolls off-screen; restart on re-entry
		const canvas = document.getElementById('demo-canvas');
		const ioObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					if (rafId === -1) rafId = requestAnimationFrame(drawLoop);
				} else {
					cancelAnimationFrame(rafId);
					rafId = -1;
				}
			},
			{ threshold: 0 }
		);
		if (canvas) ioObserver.observe(canvas);

		return () => {
			cancelAnimationFrame(rafId);
			ioObserver.disconnect();
			if (mouseFn) window.removeEventListener('mousemove', mouseFn);
			if (resizeFn) window.removeEventListener('resize', resizeFn);
		};
	});
</script>

<canvas id="demo-canvas" class="demo-canvas"></canvas>

<style>
	canvas {
		position: absolute;
	}
</style>
