import { useEffect, useState } from 'react';

import { Button } from '@ui/button';

export function ThemeToggle() {
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			return savedTheme;
		}
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		return prefersDarkScheme ? 'dark' : 'light';
	});

	useEffect(() => {
		const bodyClassList = document.body.classList;

		if (bodyClassList[0] === `theme-${theme}`) return;

		bodyClassList.remove('theme-light', 'theme-dark');
		bodyClassList.add(`theme-${theme}`);

		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		if (document.body.style.transition === '') {
			document.body.style.transition =
				'background-color 0.5s ease, color 0.5s ease, text-shadow 0.5s ease, all 0.5s ease';
		}
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<Button onClick={toggleTheme}>
			{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
		</Button>
	);
}
