import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './Nav.module.scss'

export interface NavDropdownItem {
	href: string
	label: string
	meta?: string
	icon?: ReactNode
}

interface NavDropdownProps {
	id: string
	label: string
	href: string
	items: NavDropdownItem[]
	footer?: { href: string; label: string }
	isActive?: boolean
	accent?: 'default' | 'web'
}

export function NavDropdown({ id, label, href, items, footer, isActive, accent = 'default' }: NavDropdownProps) {
	return (
		<li className={`${styles.item} ${accent === 'web' ? styles.itemWeb : ''}`}>
			<Link
				href={href}
				className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
				aria-haspopup='true'
				aria-expanded='false'
				aria-controls={`nav-dropdown-${id}`}
			>
				{label}
				<svg
					width='12'
					height='12'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2.5'
					strokeLinecap='round'
					strokeLinejoin='round'
					aria-hidden
				>
					<polyline points='6 9 12 15 18 9' />
				</svg>
			</Link>
			<div className={styles.dropdown} id={`nav-dropdown-${id}`} role='menu'>
				{items.map(item => (
					<Link key={item.href} href={item.href} className={styles.dropdownLink} role='menuitem'>
						{item.icon}
						<span className={styles.dropdownText}>
							<span className={styles.dropdownLabel}>{item.label}</span>
							{item.meta && <span className={styles.dropdownMeta}>{item.meta}</span>}
						</span>
					</Link>
				))}
				{footer && (
					<Link href={footer.href} className={styles.dropdownFooter} role='menuitem'>
						{footer.label}
						<svg
							width='12'
							height='12'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
							aria-hidden
						>
							<line x1='5' y1='12' x2='19' y2='12' />
							<polyline points='12 5 19 12 12 19' />
						</svg>
					</Link>
				)}
			</div>
		</li>
	)
}
