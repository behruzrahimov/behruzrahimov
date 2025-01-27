import type { FunctionComponent } from 'react';

import { Icon } from '@ui/index';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { IButtonProps } from './type';

export const Button: FunctionComponent<IButtonProps> = ({
	children,
	mode = 'primary',
	iconLeft,
	iconRight,
	isLoading,
	...rest
}) => {
	//-----------------------------------------------------------------------------------
	// states
	//-----------------------------------------------------------------------------------
	const buttonStyles = classNames(rest.className, {
		[styles.button]: true,
		[styles.primary]: mode === 'primary',
		[styles.secondary]: mode === 'secondary',
		[styles.simple]: mode === 'simple',
	});

	//-----------------------------------------------------------------------------------
	if (isLoading) {
		return (
			<button key="btn" {...rest} className={buttonStyles} disabled>
				<Icon className={styles.loading} name="Loading" />
			</button>
		);
	}

	//-----------------------------------------------------------------------------------
	return (
		<button key="btn" {...rest} className={buttonStyles}>
			{iconLeft}
			{children}
			{iconRight}
		</button>
	);
};
