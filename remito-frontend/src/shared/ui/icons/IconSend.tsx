import { IconProps } from './icon.types'

export function IconSend({ size = 24, color = 'currentColor', stroke = 1.8 }: IconProps) {
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
			<line x1='22' y1='2' x2='11' y2='13' />
			<polygon points='22 2 15 22 11 13 2 9 22 2' />
		</svg>
	)
}
