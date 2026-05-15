import { IconProps } from './icon.types'

export function Icon2Gis({ size = 24, color = 'currentColor', stroke = 1.8 }: IconProps) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke={color} width={size} height={size}>
			<circle strokeWidth={stroke} cx='12' cy='12' r='10' opacity='.15' />
			<text x='12' y='16' text-anchor='middle' font-size='10' font-weight='600' fill='currentColor'>
				2G
			</text>
		</svg>
	)
}
