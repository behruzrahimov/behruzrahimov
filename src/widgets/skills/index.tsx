import { useState } from 'react';

import { motion } from 'framer-motion';
import {
	SiCplusplus,
	SiCss,
	SiDocker,
	SiEthereum,
	SiExpress,
	SiGo,
	SiGraphql,
	SiHedgedoc,
	SiHtml5,
	SiIpfs,
	SiJavascript,
	SiJest,
	SiKubernetes,
	SiLevelsdotfyi,
	SiMongodb,
	SiNestjs,
	SiNodedotjs,
	SiPostgresql,
	SiPython,
	SiReact,
	SiRedis,
	SiSolidity,
	SiTypescript,
} from 'react-icons/si';
import { useInView } from 'react-intersection-observer';

import { SKILL_CATEGORIES } from '@constants/index';

import styles from './styles.module.scss';

const SKILL_ICONS: Record<string, React.ElementType> = {
	'HTML5': SiHtml5,
	'CSS / SCSS': SiCss,
	'JavaScript': SiJavascript,
	'TypeScript': SiTypescript,
	'React.js': SiReact,
	'React Native': SiReact,
	'Node.js': SiNodedotjs,
	'Nest.js': SiNestjs,
	'Express.js': SiExpress,
	'Fastify.js': SiNodedotjs,
	'PostgreSQL': SiPostgresql,
	'MongoDB': SiMongodb,
	'Redis': SiRedis,
	'CouchDB': SiMongodb,
	'PouchDB': SiMongodb,
	'LevelDB': SiLevelsdotfyi,
	'Ethereum': SiEthereum,
	'Solidity': SiSolidity,
	'Hardhat': SiHedgedoc,
	'Truffle': SiEthereum,
	'IPFS': SiIpfs,
	'MetaMask': SiEthereum,
	'Jest': SiJest,
	'Vite': SiJavascript,
	'Mocha': SiJest,
	'Python': SiPython,
	'GoLang': SiGo,
	'C++': SiCplusplus,
	'Docker': SiDocker,
	'GraphQL': SiGraphql,
	'TypeORM': SiPostgresql,
	'Libp2p': SiNodedotjs,
	'Kubernetes': SiKubernetes,
};

const CATEGORY_COLORS: Record<string, { primary: string; secondary: string; bg: string }> = {
	frontend: { primary: '#61dafb', secondary: '#0066ff', bg: 'rgba(97, 218, 251, 0.08)' },
	backend: { primary: '#68d391', secondary: '#22c55e', bg: 'rgba(104, 211, 145, 0.08)' },
	database: { primary: '#f6ad55', secondary: '#f97316', bg: 'rgba(246, 173, 85, 0.08)' },
	blockchain: { primary: '#b794f4', secondary: '#7c3aed', bg: 'rgba(183, 148, 244, 0.08)' },
	testing: { primary: '#fc8181', secondary: '#ef4444', bg: 'rgba(252, 129, 129, 0.08)' },
	other: { primary: '#00d4ff', secondary: '#0066ff', bg: 'rgba(0, 212, 255, 0.08)' },
};

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 40, scale: 0.95 },
	visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const skillVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export function Skills() {
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

	const displayed = activeCategory
		? SKILL_CATEGORIES.filter((c) => c.id === activeCategory)
		: SKILL_CATEGORIES;

	return (
		<section id="skills" className={styles.skills}>
			<div className={styles.container}>
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<div className={styles.sectionHeader}>
						<span className={styles.sectionTag}>// tech stack</span>
						<h2 className={styles.sectionTitle}>
							Skills &{' '}
							<span className={styles.gradientText}>Technologies</span>
						</h2>
					</div>
				</motion.div>

				<motion.div
					className={styles.filters}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<button
						className={`${styles.filterBtn} ${!activeCategory ? styles.filterActive : ''}`}
						onClick={() => setActiveCategory(null)}
					>
						All
					</button>
					{SKILL_CATEGORIES.map((cat) => (
						<button
							key={cat.id}
							className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ''}`}
							onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
							style={{
								'--cat-color': CATEGORY_COLORS[cat.id]?.primary,
							} as React.CSSProperties}
						>
							{cat.label}
						</button>
					))}
				</motion.div>

				<motion.div
					className={styles.grid}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
				>
					{displayed.map((category) => {
						const colors = CATEGORY_COLORS[category.id];

						return (
							<motion.div
								key={category.id}
								className={styles.categoryCard}
								variants={cardVariants}
								style={{
									'--cat-primary': colors?.primary,
									'--cat-secondary': colors?.secondary,
									'--cat-bg': colors?.bg,
								} as React.CSSProperties}
								whileHover={{ y: -4, transition: { duration: 0.2 } }}
							>
								<div className={styles.categoryHeader}>
									<h3 className={styles.categoryTitle}>{category.label}</h3>
									<span className={styles.skillCount}>{category.skills.length}</span>
								</div>

								<div className={styles.skillsGrid}>
									{category.skills.map((skill, i) => {
										const IconComponent = SKILL_ICONS[skill];
										return (
											<motion.div
												key={skill}
												className={styles.skillBadge}
												variants={skillVariants}
												custom={i}
												whileHover={{
													scale: 1.08,
													y: -2,
													transition: { duration: 0.15 },
												}}
											>
												{IconComponent && (
													<IconComponent
														size={15}
														className={styles.skillIcon}
													/>
												)}
												<span>{skill}</span>
											</motion.div>
										);
									})}
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
