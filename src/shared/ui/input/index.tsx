import React from 'react';

import { IInputProps } from '@appType/index';

import styles from './styles.module.scss';

export const Input: React.FC<IInputProps> = ({
	label,
	icon,
	alt,
	...props
}) => {
	return (
		<div className={styles.inputWrapper}>
			<input
				type="text"
				className={styles.adaptiveInput}
				placeholder=""
				required
				{...props}
			/>
			<label data-placeholder={label} data-alt={alt ?? label}></label>
			{icon && <div className={styles.icon}>{icon}</div>}
		</div>
	);
};
