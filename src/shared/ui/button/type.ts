import { ButtonHTMLAttributes, ReactElement } from 'react';

import { Icon } from '@ui/icon';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	iconLeft?: ReactElement<typeof Icon>;
	iconRight?: ReactElement<typeof Icon>;
	mode?: 'primary' | 'secondary' | 'simple';
	isLoading?: boolean;
}
