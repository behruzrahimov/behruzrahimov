import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

import { AREAS_OF_EXPERTISE, PERSONAL_INFO, PROFILE_TEXT } from '@constants/index';

import styles from './styles.module.scss';

interface StatCounterProps {
	value: number;
	suffix: string;
	label: string;
	isInView: boolean;
}

function StatCounter({ value, suffix, label, isInView }: StatCounterProps) {
	const [count, setCount] = useState(0);
	const hasAnimated = useRef(false);

	useEffect(() => {
		if (!isInView || hasAnimated.current) return;
		hasAnimated.current = true;

		const duration = 1800;
		const steps = 60;
		const increment = value / steps;
		let current = 0;
		let step = 0;

		const timer = setInterval(() => {
			step++;
			current = Math.min(Math.round(increment * step), value);
			setCount(current);
			if (current >= value) clearInterval(timer);
		}, duration / steps);

		return () => clearInterval(timer);
	}, [isInView, value]);

	return (
		<div className={styles.stat}>
			<span className={styles.statValue}>
				{count}
				<span className={styles.statSuffix}>{suffix}</span>
			</span>
			<span className={styles.statLabel}>{label}</span>
		</div>
	);
}

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function About() {
	const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

	return (
		<section id="about" className={styles.about}>
			<div className={styles.container}>
				<motion.div
					ref={ref}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
				>
					<motion.div className={styles.sectionHeader} variants={itemVariants}>
						<span className={styles.sectionTag}>// about me</span>
						<h2 className={styles.sectionTitle}>
							Who I <span className={styles.gradientText}>Am</span>
						</h2>
					</motion.div>

					<div className={styles.grid}>
						<motion.div className={styles.profileCard} variants={itemVariants}>
							<div className={styles.cardGlow} />
							<img
								src={PERSONAL_INFO.avatar}
								alt={PERSONAL_INFO.name}
								className={styles.profileImg}
							/>
							<div className={styles.profileInfo}>
								<h3 className={styles.profileName}>{PERSONAL_INFO.name}</h3>
								<p className={styles.profileTitle}>{PERSONAL_INFO.title}</p>
								<div className={styles.location}>
									<FiMapPin size={14} />
									<span>{PERSONAL_INFO.location}</span>
								</div>
								<div className={styles.company}>
									Working at{' '}
									<span className={styles.companyName}>{PERSONAL_INFO.company}</span>
								</div>
							</div>
						</motion.div>

						<div className={styles.textBlock}>
							<motion.p className={styles.profileText} variants={itemVariants}>
								{PROFILE_TEXT}
							</motion.p>

							<motion.div className={styles.stats} variants={itemVariants}>
								<StatCounter
									value={PERSONAL_INFO.stats.experience}
									suffix="+"
									label="Years Experience"
									isInView={inView}
								/>
								<StatCounter
									value={PERSONAL_INFO.stats.projects}
									suffix="+"
									label="Public Repos"
									isInView={inView}
								/>
								<StatCounter
									value={PERSONAL_INFO.stats.followers}
									suffix=""
									label="GitHub Followers"
									isInView={inView}
								/>
							</motion.div>

							<motion.div className={styles.expertise} variants={itemVariants}>
								<h4 className={styles.expertiseTitle}>Areas of Expertise</h4>
								<div className={styles.expertiseTags}>
									{AREAS_OF_EXPERTISE.map((area, i) => (
										<motion.span
											key={area}
											className={styles.expertiseTag}
											initial={{ opacity: 0, scale: 0.8 }}
											animate={inView ? { opacity: 1, scale: 1 } : {}}
											transition={{ delay: 0.5 + i * 0.04 }}
										>
											{area}
										</motion.span>
									))}
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
