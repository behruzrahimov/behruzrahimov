import { useEffect } from 'react';

import Home from '@pages/index';

import { Layout } from '../layout';

export default function App() {
	useEffect(() => {
		const bodyClassList = document.body.classList;
		bodyClassList.add(`theme-dark`);
	}, []);

	return (
		<Layout>
			<Home />
		</Layout>
	);
}
