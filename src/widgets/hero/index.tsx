import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiArrowDown } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';

import { PERSONAL_INFO, TYPEWRITER_SEQUENCES } from '@constants/index';

import styles from './styles.module.scss';

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	alpha: number;
}

function ParticleCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animId: number;
		const particles: Particle[] = [];
		const PARTICLE_COUNT = 80;
		const CONNECTION_DISTANCE = 120;

		const resize = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		for (let i = 0; i < PARTICLE_COUNT; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.4,
				vy: (Math.random() - 0.5) * 0.4,
				radius: Math.random() * 1.5 + 0.5,
				alpha: Math.random() * 0.5 + 0.2,
			});
		}

		const isDark = () => document.body.classList.contains('theme-dark');

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const primaryColor = isDark() ? '0, 212, 255' : '0, 102, 255';

			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
				if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${primaryColor}, ${p.alpha})`;
				ctx.fill();
			}

			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < CONNECTION_DISTANCE) {
						const lineAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.strokeStyle = `rgba(${primaryColor}, ${lineAlpha})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}
				}
			}

			animId = requestAnimationFrame(draw);
		};
		draw();

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
		};
	}, []);

	return <canvas ref={canvasRef} className={styles.canvas} />;
}

const socialLinks = [
	{ icon: FaGithub, url: PERSONAL_INFO.social.github, label: 'GitHub' },
	{ icon: FaLinkedin, url: PERSONAL_INFO.social.linkedin, label: 'LinkedIn' },
	{ icon: FaTwitter, url: PERSONAL_INFO.social.twitter, label: 'Twitter' },
] as const;

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.3 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Hero() {
	const scrollToWork = () => {
		document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
	};

	const scrollToAbout = () => {
		document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section id="hero" className={styles.hero}>
			<ParticleCanvas />

			{/* Background orbs handled by ScrollBackground */}

			<motion.div
				className={styles.content}
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div className={styles.avatarWrapper} variants={itemVariants}>
					<div className={styles.avatarRing} />
					<div className={styles.avatarRing2} />
					<img
						src={PERSONAL_INFO.avatar}
						alt={PERSONAL_INFO.name}
						className={styles.avatar}
					/>
					<div className={styles.statusDot} />
				</motion.div>

				<motion.div className={styles.greeting} variants={itemVariants}>
					<span className={styles.greetingBadge}>
						<span className={styles.greetingDot} />
						Available for work
					</span>
				</motion.div>

				<motion.h1 className={styles.title} variants={itemVariants}>
					Hi, I'm{' '}
					<span className={styles.gradientName}>{PERSONAL_INFO.firstName}</span>
				</motion.h1>

				<motion.div className={styles.typewriterWrapper} variants={itemVariants}>
					<span className={styles.typewriterPrefix}>// </span>
					<TypeAnimation
						sequence={[...TYPEWRITER_SEQUENCES] as (string | number)[]}
						wrapper="span"
						speed={50}
						repeat={Infinity}
						className={styles.typewriter}
					/>
					<span className={styles.cursor} />
				</motion.div>

				<motion.p className={styles.bio} variants={itemVariants}>
					{PERSONAL_INFO.bio}
				</motion.p>

				<motion.div className={styles.cta} variants={itemVariants}>
					<motion.button
						className={styles.ctaPrimary}
						onClick={scrollToWork}
						whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)' }}
						whileTap={{ scale: 0.97 }}
					>
						View My Work
						<span className={styles.ctaArrow}>→</span>
					</motion.button>
					<motion.a
						href={`mailto:${PERSONAL_INFO.email}`}
						className={styles.ctaSecondary}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.97 }}
					>
						Get In Touch
					</motion.a>
				</motion.div>

				<motion.div className={styles.socials} variants={itemVariants}>
					{socialLinks.map(({ icon: Icon, url, label }) => (
						<motion.a
							key={label}
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
							className={styles.socialLink}
							whileHover={{ scale: 1.2, y: -3 }}
							whileTap={{ scale: 0.9 }}
						>
							<Icon size={22} />
						</motion.a>
					))}
				</motion.div>

				<motion.div
					className={styles.techStack}
					variants={itemVariants}
				>
					{['React', 'TypeScript', 'Node.js', 'Web3'].map((tech) => (
						<span key={tech} className={styles.techBadge}>{tech}</span>
					))}
				</motion.div>
			</motion.div>

			<motion.button
				className={styles.scrollDown}
				onClick={scrollToAbout}
				aria-label="Scroll down"
				animate={{ y: [0, 8, 0] }}
				transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
			>
				<FiArrowDown size={20} />
			</motion.button>
		</section>
	);
}
