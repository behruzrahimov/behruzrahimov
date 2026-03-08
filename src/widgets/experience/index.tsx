import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiChevronDown, FiMapPin } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

import { EXPERIENCE } from '@constants/index';

import styles from './styles.module.scss';

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.2 } },
};

const lineVariants = {
	hidden: { scaleY: 0 },
	visible: { scaleY: 1, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

interface ExperienceCardProps {
	exp: (typeof EXPERIENCE)[0];
	index: number;
	isLeft: boolean;
}

function ExperienceCard({ exp, index, isLeft }: ExperienceCardProps) {
	const [expanded, setExpanded] = useState(index === 0);
	const [cardRef, cardInView] = useInView({ threshold: 0.15, triggerOnce: true });

	return (
		<motion.div
			ref={cardRef}
			className={`${styles.timelineItem} ${isLeft ? styles.left : styles.right}`}
			initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
			animate={cardInView ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
		>
			<div className={`${styles.card} ${exp.isCurrent ? styles.current : ''}`}>
				<div className={styles.cardGlow} />

				<div className={styles.cardHeader} onClick={() => setExpanded((v) => !v)}>
					<div className={styles.cardTitleGroup}>
						<div className={styles.roleWrapper}>
							{exp.isCurrent && (
								<span className={styles.currentBadge}>Current</span>
							)}
							<h3 className={styles.role}>{exp.role}</h3>
						</div>
						<div className={styles.company}>
							<FiBriefcase size={14} />
							<span>{exp.company}</span>
						</div>
					</div>

					<div className={styles.cardMeta}>
						<div className={styles.metaItem}>
							<FiCalendar size={13} />
							<span>{exp.period}</span>
						</div>
						<div className={styles.metaItem}>
							<FiMapPin size={13} />
							<span>{exp.location}</span>
						</div>
					</div>

					<motion.div
						className={styles.expandIcon}
						animate={{ rotate: expanded ? 180 : 0 }}
						transition={{ duration: 0.3 }}
					>
						<FiChevronDown size={18} />
					</motion.div>
				</div>

				<AnimatePresence>
					{expanded && (
						<motion.div
							className={styles.highlights}
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
						>
							<ul className={styles.highlightList}>
								{exp.highlights.map((h, i) => (
									<motion.li
										key={i}
										className={styles.highlightItem}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: i * 0.05 + 0.1 }}
									>
										<span className={styles.bullet} />
										{h}
									</motion.li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className={styles.dot}>
				<div className={styles.dotInner} />
				<div className={styles.dotPulse} />
			</div>
		</motion.div>
	);
}

export function Experience() {
	const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

	return (
		<section id="experience" className={styles.experience}>
			<div className={styles.container}>
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<div className={styles.sectionHeader}>
						<span className={styles.sectionTag}>// work history</span>
						<h2 className={styles.sectionTitle}>
							Professional{' '}
							<span className={styles.gradientText}>Experience</span>
						</h2>
					</div>
				</motion.div>

				<div className={styles.timeline}>
					<motion.div
						className={styles.timelineLine}
						variants={lineVariants}
						initial="hidden"
						animate={inView ? 'visible' : 'hidden'}
					/>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate={inView ? 'visible' : 'hidden'}
					>
						{EXPERIENCE.map((exp, i) => (
							<ExperienceCard
								key={exp.id}
								exp={exp}
								index={i}
								isLeft={i % 2 === 0}
							/>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
