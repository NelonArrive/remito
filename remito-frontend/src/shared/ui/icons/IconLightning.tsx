import { IconProps } from './icon.types'

export function IconLightning({ size = 24, color = 'currentColor', stroke = 1.8 }: IconProps) {
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
			<polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
		</svg>
	)
}
