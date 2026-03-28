import Image from 'next/image'
import Link from 'next/link'
import styles from './Logo.module.scss'

interface LogoProps {
	compact?: boolean
}

export const Logo = ({ compact = false }: LogoProps) => {
	return (
		<Link href='/' className={styles.logo} aria-label='Remito — на главную'>
			<div className={`${styles.icon} ${compact ? styles.iconCompact : ''}`}>
				<Image
					src='/img/svg/logo.svg'
					alt='Remito логотип'
					width={compact ? 34 : 40}
					height={compact ? 34 : 40}
					priority
				/>
			</div>
			<div className={styles.text}>
				<span className={`${styles.name} ${compact ? styles.nameCompact : ''}`}>Remito</span>
				{!compact && <span className={styles.slogan}>Ремонт оргтехники в Екатеринбурге</span>}
			</div>
		</Link>
	)
}
