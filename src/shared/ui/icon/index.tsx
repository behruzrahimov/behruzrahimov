import React from 'react';

import Icons from '@icons/index';

export type TNameIcon = keyof typeof Icons;

interface IconProps {
	hidden?: boolean;
	className?: string;
	name: TNameIcon;
	size?: number | [number, number];
	onClick?: React.MouseEventHandler<SVGSVGElement>;
	style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
	className,
	name,
	size = 24,
	onClick,
	hidden,
}) => {
	if (hidden) return null;

	//-----------------------------------------------------------------------------------
	// states
	//-----------------------------------------------------------------------------------

	const iconStyle: React.CSSProperties = Array.isArray(size)
		? { width: size[0], height: size[1] }
		: { width: size, height: size };

	const IconComponent = Icons[name];

	//-----------------------------------------------------------------------------------
	return (
		<IconComponent
			style={iconStyle}
			// fill="currentColor"
			className={className}
			onClick={onClick}
		/>
	);
};
