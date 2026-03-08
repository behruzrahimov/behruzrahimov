import { useEffect } from 'react';

import Home from '@pages/index';
import { ScrollBackground } from '@ui/scroll-background';

import { Layout } from '../layout';

export default function App() {
	useEffect(() => {
		const bodyClassList = document.body.classList;
		bodyClassList.remove('theme-light', 'theme-dark');
		bodyClassList.add(`theme-dark`);
	}, []);

	return (
		<>
			<ScrollBackground />
			<Layout>
				<Home />
			</Layout>
		</>
	);
}
