import { useEffect, useState } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import { NAV_LINKS, PERSONAL_INFO } from '@constants/index';
import { ThemeToggle } from '@ui/theme-toggle';

import styles from './styles.module.scss';

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState('hero');
	const [menuOpen, setMenuOpen] = useState(false);
	const { scrollY } = useScroll();

	const headerOpacity = useTransform(scrollY, [0, 80], [0, 1]);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);

			const sections = NAV_LINKS.map((l) => l.id);
			for (const id of [...sections].reverse()) {
				const el = document.getElementById(id);
				if (el && window.scrollY + 100 >= el.offsetTop) {
					setActiveSection(id);
					break;
				}
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToSection = (href: string) => {
		const id = href.replace('#', '');
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
		setMenuOpen(false);
	};

	return (
		<motion.header
			className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
			style={{ '--header-opacity': headerOpacity } as React.CSSProperties}
		>
			<div className={styles.inner}>
				<motion.a
					className={styles.logo}
					href="#hero"
					onClick={(e) => {
						e.preventDefault();
						scrollToSection('#hero');
					}}
					whileHover={{ scale: 1.05 }}
				>
					<span className={styles.logoText}>{PERSONAL_INFO.firstName}</span>
					<span className={styles.logoDot}>.</span>
				</motion.a>

				<nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
					{NAV_LINKS.map((link, i) => (
						<motion.a
							key={link.id}
							href={link.href}
							className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
							onClick={(e) => {
								e.preventDefault();
								scrollToSection(link.href);
							}}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.05 + 0.2 }}
						>
							{link.label}
						</motion.a>
					))}
				</nav>

				<div className={styles.actions}>
					<ThemeToggle />
					<button
						className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ''}`}
						onClick={() => setMenuOpen((v) => !v)}
						aria-label="Toggle menu"
					>
						<span />
						<span />
						<span />
					</button>
				</div>
			</div>
		</motion.header>
	);
}
