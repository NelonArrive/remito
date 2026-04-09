import { IconProps } from './icon.types'

export function IconHome({ size = 24, color = 'currentColor', stroke = 1.8 }: IconProps) {
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
			<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
			<polyline points='9 22 9 12 15 12 15 22' />
		</svg>
	)
}
