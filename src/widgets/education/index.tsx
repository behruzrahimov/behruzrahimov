import { motion } from 'framer-motion';
import {
	FiAward,
	FiBook,
	FiCalendar,
	FiGlobe,
	FiMapPin,
} from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

import { CERTIFICATIONS, EDUCATION, LANGUAGES } from '@constants/index';

import styles from './styles.module.scss';

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const LANG_LEVELS: Record<string, number> = {
	C2: 100,
	C1: 83,
	'B2': 67,
	'A2/B1': 45,
	A1: 17,
};

export function Education() {
	const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

	return (
		<section id="education" className={styles.education}>
			<div className={styles.container}>
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<div className={styles.sectionHeader}>
						<span className={styles.sectionTag}>// background</span>
						<h2 className={styles.sectionTitle}>
							Education &{' '}
							<span className={styles.gradientText}>Certificates</span>
						</h2>
					</div>
				</motion.div>

				<motion.div
					className={styles.grid}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
				>
					{/* Education */}
					<motion.div className={styles.column} variants={itemVariants}>
						<h3 className={styles.columnTitle}>
							<FiBook size={18} />
							Education
						</h3>
						{EDUCATION.map((edu) => (
							<div key={edu.id} className={styles.eduCard}>
								<div className={styles.cardGlow} />
								<div className={styles.eduHeader}>
									<span className={styles.degreeIcon}>🎓</span>
									<div>
										<h4 className={styles.degree}>{edu.degree}</h4>
										<div className={styles.institution}>{edu.institution}</div>
									</div>
								</div>
								<div className={styles.eduMeta}>
									<div className={styles.metaItem}>
										<FiCalendar size={13} />
										<span>{edu.period}</span>
									</div>
									<div className={styles.metaItem}>
										<FiMapPin size={13} />
										<span>{edu.location}</span>
									</div>
								</div>
								<div className={styles.courses}>
									<p className={styles.coursesLabel}>Relevant Courses:</p>
									<div className={styles.coursesList}>
										{edu.courses.map((course, i) => (
											<motion.span
												key={i}
												className={styles.courseBadge}
												initial={{ opacity: 0, scale: 0.9 }}
												animate={inView ? { opacity: 1, scale: 1 } : {}}
												transition={{ delay: 0.4 + i * 0.06 }}
											>
												{course}
											</motion.span>
										))}
									</div>
								</div>
							</div>
						))}

						{/* Languages */}
						<h3 className={`${styles.columnTitle} ${styles.columnTitleSpaced}`}>
							<FiGlobe size={18} />
							Languages
						</h3>
						<div className={styles.langCard}>
							<div className={styles.cardGlow} />
							{LANGUAGES.map((lang, i) => (
								<motion.div
									key={lang.id}
									className={styles.langItem}
									initial={{ opacity: 0, x: -20 }}
									animate={inView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.3 + i * 0.1 }}
								>
									<div className={styles.langHeader}>
										<span className={styles.langName}>{lang.name}</span>
										<div className={styles.langRight}>
											<span className={styles.langLevel}>{lang.level}</span>
											<span className={styles.langProf}>{lang.proficiency}</span>
										</div>
									</div>
									<div className={styles.langBar}>
										<motion.div
											className={styles.langFill}
											initial={{ width: 0 }}
											animate={inView ? { width: `${LANG_LEVELS[lang.proficiency] ?? 50}%` } : {}}
											transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
										/>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Certifications */}
					<motion.div className={styles.column} variants={itemVariants}>
						<h3 className={styles.columnTitle}>
							<FiAward size={18} />
							Certifications
						</h3>
						<div className={styles.certsTimeline}>
							{CERTIFICATIONS.map((cert, i) => (
								<motion.div
									key={cert.id}
									className={styles.certItem}
									initial={{ opacity: 0, x: 30 }}
									animate={inView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.2 + i * 0.1 }}
								>
									<div className={styles.certDot}>
										<FiAward size={12} />
									</div>
									<div className={styles.certCard}>
										<div className={styles.cardGlow} />
										<div className={styles.certName}>{cert.name}</div>
										<div className={styles.certDate}>
											<FiCalendar size={12} />
											<span>{cert.date}</span>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
