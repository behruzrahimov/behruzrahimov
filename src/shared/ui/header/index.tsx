import { ThemeToggle } from '@ui/theme-toggle';

import style from './styles.module.scss';

export function Header() {
	return (
		<div className={style.header}>
			Header <ThemeToggle />
		</div>
	);
}
