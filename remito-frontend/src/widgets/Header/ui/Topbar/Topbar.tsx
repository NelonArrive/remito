import Link from 'next/link'
import styles from './Topbar.module.scss'

interface TopbarProps {
	isWeb?: boolean
}

export const Topbar = ({ isWeb = false }: TopbarProps) => {
	return (
		<div className={`${styles.topbar} ${isWeb ? styles.topbarWeb : ''}`}>
			<div className='container'>
				<div className={styles.left}>
					<span className={styles.item}>
						<svg
							width='13'
							height='13'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<circle cx='12' cy='12' r='10' />
							<polyline points='12 6 12 12 16 14' />
						</svg>
						Пн–Вс, 9:00–21:00
					</span>

					{!isWeb && (
						<span className={`${styles.item} ${styles.itemHideSm}`}>
							<svg
								width='13'
								height='13'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2.2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
							</svg>
							Гарантия на работы
						</span>
					)}

					{isWeb && (
						<span className={`${styles.item} ${styles.itemHideSm}`}>
							<svg
								width='13'
								height='13'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2.2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='16 18 22 12 16 6' />
								<polyline points='8 6 2 12 8 18' />
							</svg>
							Next.js · SEO · адаптив
						</span>
					)}
				</div>

				<div className={styles.right}>
					{isWeb ? (
						<>
							<span className={styles.badgeWeb}>Remito Web</span>
							<Link href='/' className={styles.link}>
								Ремонт техники
							</Link>
						</>
					) : (
						<span className={styles.badge}>Принимаем заявки</span>
					)}
					<Link href='/kontakty/' className={styles.link}>
						Контакты
					</Link>
					<Link href='/blog/' className={`${styles.link} ${styles.linkHideSm}`}>
						Блог
					</Link>
				</div>
			</div>
		</div>
	)
}
