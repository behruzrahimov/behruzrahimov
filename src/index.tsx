import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@app/index';

import './index.scss';
import Layout from './layout';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Layout>
			<App />
		</Layout>
	</StrictMode>
);
