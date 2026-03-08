import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiArrowUp, FiHeart } from 'react-icons/fi';

import { PERSONAL_INFO } from '@constants/index';

import styles from './styles.module.scss';

const socialLinks = [
	{ icon: FaGithub, url: PERSONAL_INFO.social.github, label: 'GitHub' },
	{ icon: FaLinkedin, url: PERSONAL_INFO.social.linkedin, label: 'LinkedIn' },
	{ icon: FaTwitter, url: PERSONAL_INFO.social.twitter, label: 'Twitter' },
] as const;

export function Footer() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<footer className={styles.footer}>
			<div className={styles.dividerLine} />
			<div className={styles.container}>
				<div className={styles.left}>
					<span className={styles.logo}>
						{PERSONAL_INFO.firstName}
						<span className={styles.logoDot}>.</span>
					</span>
					<p className={styles.copyright}>
						&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
					</p>
				</div>

				<div className={styles.center}>
					<p className={styles.builtWith}>
						Built with <FiHeart size={12} className={styles.heart} /> using React & TypeScript
					</p>
				</div>

				<div className={styles.right}>
					<div className={styles.socials}>
						{socialLinks.map(({ icon: Icon, url, label }) => (
							<motion.a
								key={label}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className={styles.socialLink}
								whileHover={{ scale: 1.15, y: -2 }}
								whileTap={{ scale: 0.9 }}
							>
								<Icon size={18} />
							</motion.a>
						))}
					</div>

					<motion.button
						className={styles.backToTop}
						onClick={scrollToTop}
						whileHover={{ scale: 1.1, y: -2 }}
						whileTap={{ scale: 0.95 }}
						aria-label="Back to top"
					>
						<FiArrowUp size={16} />
					</motion.button>
				</div>
			</div>
		</footer>
	);
}
