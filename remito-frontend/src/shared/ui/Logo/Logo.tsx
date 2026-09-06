import Image from 'next/image'
import Link from 'next/link'
import styles from './Logo.module.scss'

interface LogoProps {
	compact?: boolean
	href?: string
	slogan?: string
}

export const Logo = ({ compact = false, href = '/', slogan }: LogoProps) => {
	const label = href.startsWith('/web') ? 'Remito Web — на главную' : 'Remito — на главную'
	const defaultSlogan = compact ? undefined : 'Ремонт оргтехники'
	const displaySlogan = slogan ?? defaultSlogan

	return (
		<Link href={href} className={styles.logo} aria-label={label}>
			<div className={`${styles.icon} ${compact ? styles.iconCompact : ''}`}>
				<Image
					src='/img/logo.svg'
					alt='Remito логотип'
					width={compact ? 34 : 40}
					height={compact ? 34 : 40}
					priority
				/>
			</div>
			<div className={styles.text}>
				<span className={`${styles.name} ${compact ? styles.nameCompact : ''}`}>
					Remito{href.startsWith('/web') && <span className={styles.nameAccent}> Web</span>}
				</span>
				{displaySlogan && <span className={styles.slogan}>{displaySlogan}</span>}
			</div>
		</Link>
	)
}
