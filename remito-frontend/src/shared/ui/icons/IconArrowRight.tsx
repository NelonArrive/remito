import { IconProps } from './icon.types'

export function IconArrowRight({ size = 24, color = 'currentColor', stroke = 1.8 }: IconProps) {
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
			<line x1='5' y1='12' x2='19' y2='12' />
			<polyline points='12 5 19 12 12 19' />
		</svg>
	)
}
