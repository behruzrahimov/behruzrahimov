import { useEffect, useRef } from 'react';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import styles from './styles.module.scss';

function GridCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const scrollRef = useRef(0);
	const mouseRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animId: number;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();

		const onScroll = () => {
			scrollRef.current = window.scrollY;
		};

		const onMouse = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
		};

		window.addEventListener('resize', resize);
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('mousemove', onMouse, { passive: true });

		const isDark = () => document.body.classList.contains('theme-dark');

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const dark = isDark();
			const scroll = scrollRef.current;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollProgress = docHeight > 0 ? scroll / docHeight : 0;

			// Subtle moving grid that shifts with scroll
			const gridSize = 60;
			const offsetY = (scroll * 0.08) % gridSize;
			const offsetX = (scroll * 0.03) % gridSize;

			ctx.lineWidth = 0.3;

			const gridOpacity = dark ? 0.04 : 0.03;
			const gridColor = dark ? `rgba(0, 212, 255, ${gridOpacity})` : `rgba(0, 102, 255, ${gridOpacity})`;
			ctx.strokeStyle = gridColor;

			// Vertical lines
			for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, canvas.height);
				ctx.stroke();
			}

			// Horizontal lines
			for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(canvas.width, y);
				ctx.stroke();
			}

			// Bright dot at grid intersections near mouse
			const mx = mouseRef.current.x;
			const my = mouseRef.current.y;
			const highlightRadius = 200;

			for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
				for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
					const dx = x - mx;
					const dy = y - my;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < highlightRadius) {
						const alpha = (1 - dist / highlightRadius) * 0.35;
						const dotColor = dark
							? `rgba(0, 212, 255, ${alpha})`
							: `rgba(0, 102, 255, ${alpha})`;
						ctx.beginPath();
						ctx.arc(x, y, 1.5, 0, Math.PI * 2);
						ctx.fillStyle = dotColor;
						ctx.fill();
					}
				}
			}

			// Floating aurora streaks that react to scroll
			const streakCount = 3;
			for (let i = 0; i < streakCount; i++) {
				const phase = scrollProgress * Math.PI * 2 + i * ((Math.PI * 2) / streakCount);
				const cx = canvas.width * (0.2 + 0.6 * ((Math.sin(phase * 0.7 + i) + 1) / 2));
				const cy = canvas.height * (0.15 + 0.7 * ((Math.cos(phase * 0.5 + i * 2) + 1) / 2));
				const w = 300 + Math.sin(phase) * 100;
				const h = 200 + Math.cos(phase) * 80;

				const isBlue = i % 2 === 0;
				const color1 = dark
					? isBlue ? 'rgba(0, 212, 255, 0.03)' : 'rgba(124, 58, 237, 0.03)'
					: isBlue ? 'rgba(0, 102, 255, 0.03)' : 'rgba(124, 58, 237, 0.03)';

				const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
				gradient.addColorStop(0, color1);
				gradient.addColorStop(1, 'transparent');

				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.ellipse(cx, cy, w, h, phase * 0.1, 0, Math.PI * 2);
				ctx.fill();
			}

			animId = requestAnimationFrame(draw);
		};

		draw();

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('mousemove', onMouse);
		};
	}, []);

	return <canvas ref={canvasRef} className={styles.gridCanvas} />;
}

export function ScrollBackground() {
	const { scrollYProgress } = useScroll();

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 50,
		damping: 30,
		restDelta: 0.001,
	});

	// Orbs move with scroll
	const orb1X = useTransform(smoothProgress, [0, 1], ['-10%', '15%']);
	const orb1Y = useTransform(smoothProgress, [0, 1], ['5%', '80%']);
	const orb2X = useTransform(smoothProgress, [0, 1], ['70%', '50%']);
	const orb2Y = useTransform(smoothProgress, [0, 1], ['10%', '70%']);
	const orb3X = useTransform(smoothProgress, [0, 1], ['40%', '20%']);
	const orb3Y = useTransform(smoothProgress, [0, 1], ['60%', '15%']);

	// Orbs scale/opacity with scroll
	const orb1Scale = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [1, 1.3, 0.9, 1.1]);
	const orb2Scale = useTransform(smoothProgress, [0, 0.4, 0.7, 1], [0.8, 1.2, 1, 0.9]);
	const orb3Scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 1.2]);

	return (
		<div className={styles.scrollBackground}>
			<GridCanvas />

			<motion.div
				className={`${styles.orb} ${styles.orbBlue}`}
				style={{
					left: orb1X,
					top: orb1Y,
					scale: orb1Scale,
				}}
			/>

			<motion.div
				className={`${styles.orb} ${styles.orbPurple}`}
				style={{
					left: orb2X,
					top: orb2Y,
					scale: orb2Scale,
				}}
			/>

			<motion.div
				className={`${styles.orb} ${styles.orbCyan}`}
				style={{
					left: orb3X,
					top: orb3Y,
					scale: orb3Scale,
				}}
			/>

			{/* Scroll progress line on the left edge */}
			<motion.div
				className={styles.progressLine}
				style={{ scaleY: smoothProgress }}
			/>
		</div>
	);
}
