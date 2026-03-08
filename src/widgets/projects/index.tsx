import { useState } from 'react';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

import { PROJECTS } from '@constants/index';

import styles from './styles.module.scss';

const LANGUAGE_COLORS: Record<string, string> = {
	TypeScript: '#3178c6',
	JavaScript: '#f0db4f',
	'C++': '#00599c',
	Python: '#3572a5',
	Go: '#00add8',
};

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 40, scale: 0.96 },
	visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

interface ProjectCardProps {
	project: (typeof PROJECTS)[0];
}

function ProjectCard({ project }: ProjectCardProps) {
	const color = LANGUAGE_COLORS[project.language] || '#00d4ff';

	return (
		<motion.a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			className={styles.card}
			variants={cardVariants}
			whileHover={{ y: -8, transition: { duration: 0.25 } }}
		>
			<div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 30% 30%, ${color}12 0%, transparent 70%)` }} />

			<div className={styles.cardHeader}>
				<div className={styles.cardIcon}>
					<FiGithub size={20} />
				</div>
				<div className={styles.cardLinks}>
					<div className={styles.starBadge}>
						<FiStar size={12} />
						<span>{project.stars}</span>
					</div>
					<div className={styles.externalLink}>
						<FiExternalLink size={16} />
					</div>
				</div>
			</div>

			<div className={styles.cardBody}>
				<h3 className={styles.cardTitle}>{project.name}</h3>
				<p className={styles.cardDesc}>{project.description}</p>
			</div>

			<div className={styles.cardFooter}>
				<div className={styles.langBadge}>
					<span
						className={styles.langDot}
						style={{ background: color }}
					/>
					<span>{project.language}</span>
				</div>
				{project.featured && (
					<span className={styles.featuredBadge}>Featured</span>
				)}
			</div>

			<div className={styles.hoverOverlay}>
				<span>View on GitHub</span>
				<FiExternalLink size={18} />
			</div>
		</motion.a>
	);
}

export function Projects() {
	const [filter, setFilter] = useState<string | null>(null);
	const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

	const languages = [...new Set(PROJECTS.map((p) => p.language))];
	const filtered = filter ? PROJECTS.filter((p) => p.language === filter) : PROJECTS;

	return (
		<section id="projects" className={styles.projects}>
			<div className={styles.container}>
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<div className={styles.sectionHeader}>
						<span className={styles.sectionTag}>// open source</span>
						<h2 className={styles.sectionTitle}>
							Featured{' '}
							<span className={styles.gradientText}>Projects</span>
						</h2>
						<p className={styles.sectionDesc}>
							A selection of my public GitHub repositories showcasing my work across different domains.
						</p>
					</div>
				</motion.div>

				<motion.div
					className={styles.filters}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<button
						className={`${styles.filterBtn} ${!filter ? styles.active : ''}`}
						onClick={() => setFilter(null)}
					>
						All ({PROJECTS.length})
					</button>
					{languages.map((lang) => (
						<button
							key={lang}
							className={`${styles.filterBtn} ${filter === lang ? styles.active : ''}`}
							onClick={() => setFilter(filter === lang ? null : lang)}
							style={{ '--lang-color': LANGUAGE_COLORS[lang] } as React.CSSProperties}
						>
							<span
								className={styles.langDotFilter}
								style={{ background: LANGUAGE_COLORS[lang] || '#00d4ff' }}
							/>
							{lang}
						</button>
					))}
				</motion.div>

				<motion.div
					className={styles.grid}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
				>
					{filtered.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</motion.div>

				<motion.div
					className={styles.githubCta}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.6, duration: 0.5 }}
				>
					<motion.a
						href="https://github.com/behruzrahimov"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.githubLink}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.97 }}
					>
						<FiGithub size={20} />
						<span>See all repositories on GitHub</span>
						<FiExternalLink size={16} />
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
}
