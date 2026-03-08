import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

import { PERSONAL_INFO } from '@constants/index';

import styles from './styles.module.scss';

const contactItems = [
	{
		icon: FiMail,
		label: 'Email',
		value: PERSONAL_INFO.email,
		href: `mailto:${PERSONAL_INFO.email}`,
	},
	{
		icon: FiPhone,
		label: 'Phone',
		value: PERSONAL_INFO.phone,
		href: `tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`,
	},
	{
		icon: FiMapPin,
		label: 'Location',
		value: PERSONAL_INFO.location,
		href: 'https://maps.google.com/?q=Dushanbe,Tajikistan',
	},
] as const;

const socialLinks = [
	{ icon: FaGithub, url: PERSONAL_INFO.social.github, label: 'GitHub', color: '#fff' },
	{ icon: FaLinkedin, url: PERSONAL_INFO.social.linkedin, label: 'LinkedIn', color: '#0a66c2' },
	{ icon: FaTwitter, url: PERSONAL_INFO.social.twitter, label: 'Twitter', color: '#1da1f2' },
] as const;

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Contact() {
	const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

	return (
		<section id="contact" className={styles.contact}>
			{/* Background orbs handled by ScrollBackground */}

			<div className={styles.container}>
				<motion.div
					ref={ref}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
				>
					<motion.div className={styles.sectionHeader} variants={itemVariants}>
						<span className={styles.sectionTag}>// get in touch</span>
						<h2 className={styles.sectionTitle}>
							Let's Work{' '}
							<span className={styles.gradientText}>Together</span>
						</h2>
						<p className={styles.sectionDesc}>
							I'm always open to new opportunities, collaborations, and interesting projects.
							Whether you have a question or just want to say hi, my inbox is always open!
						</p>
					</motion.div>

					<div className={styles.content}>
						<motion.div className={styles.contactCards} variants={containerVariants}>
							{contactItems.map(({ icon: Icon, label, value, href }) => (
								<motion.a
									key={label}
									href={href}
									target={label === 'Location' ? '_blank' : undefined}
									rel={label === 'Location' ? 'noopener noreferrer' : undefined}
									className={styles.contactCard}
									variants={itemVariants}
									whileHover={{ y: -4, transition: { duration: 0.2 } }}
								>
									<div className={styles.cardGlow} />
									<div className={styles.iconWrapper}>
										<Icon size={20} />
									</div>
									<div className={styles.contactInfo}>
										<span className={styles.contactLabel}>{label}</span>
										<span className={styles.contactValue}>{value}</span>
									</div>
								</motion.a>
							))}
						</motion.div>

						<motion.div className={styles.ctaBlock} variants={itemVariants}>
							<motion.a
								href={`mailto:${PERSONAL_INFO.email}`}
								className={styles.mainCta}
								whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0, 212, 255, 0.4)' }}
								whileTap={{ scale: 0.98 }}
							>
								<FiMail size={20} />
								<span>Send me an Email</span>
							</motion.a>

							<div className={styles.divider}>
								<span>or connect on social</span>
							</div>

							<div className={styles.socials}>
								{socialLinks.map(({ icon: Icon, url, label, color }) => (
									<motion.a
										key={label}
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className={styles.socialLink}
										whileHover={{
											scale: 1.15,
											y: -4,
											borderColor: color,
											boxShadow: `0 0 20px ${color}30`,
											transition: { duration: 0.2 },
										}}
										whileTap={{ scale: 0.9 }}
									>
										<Icon size={24} />
									</motion.a>
								))}
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
