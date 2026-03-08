import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';

import styles from './styles.module.scss';

export function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		const saved = localStorage.getItem('theme');
		if (saved === 'light' || saved === 'dark') return saved;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	});

	useEffect(() => {
		const bodyClassList = document.body.classList;
		if (bodyClassList[0] === `theme-${theme}`) return;
		bodyClassList.remove('theme-light', 'theme-dark');
		bodyClassList.add(`theme-${theme}`);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease';
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<motion.button
			className={styles.toggle}
			onClick={toggleTheme}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
		>
			<motion.div
				key={theme}
				initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
				animate={{ rotate: 0, opacity: 1, scale: 1 }}
				exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.3 }}
			>
				{theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
			</motion.div>
		</motion.button>
	);
}
