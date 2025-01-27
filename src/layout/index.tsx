import { ReactNode } from 'react';

import { Footer, Header } from '@ui/index';

import styles from './styles.module.scss';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className={styles.layout}>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</div>
	);
}
