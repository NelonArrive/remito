import { IconProps } from './icon.types'

export function IconInfo({ size = 24, color = 'currentColor', stroke = 1.8 }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke={color}
			strokeWidth={stroke}
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<circle cx='12' cy='12' r='10' />
			<line x1='12' y1='8' x2='12' y2='12' />
			<line x1='12' y1='16' x2='12.01' y2='16' />
		</svg>
	)
}
