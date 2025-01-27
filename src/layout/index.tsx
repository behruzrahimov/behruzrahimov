import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className={styles.layout}>
			{/* <Header /> */}
			<main className={styles.main}>{children}</main>
			{/* <Footer /> */}
		</div>
	);
}
