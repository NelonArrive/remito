import Link from 'next/link'
import styles from './Nav.module.scss'

export const Nav = () => {
	return (
		<nav className={styles.nav} aria-label='Основная навигация'>
			<ul className={styles.list}>
				{/* Услуги — с дропдауном */}
				<li className={styles.item}>
					<Link href='/uslugi' className={styles.link}>
						Услуги
						<svg
							width='12'
							height='12'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<polyline points='6 9 12 15 18 9' />
						</svg>
					</Link>
					<div className={styles.dropdown} role='menu'>
						<Link href='/remont/printer' className={styles.dropdownLink}>
							<svg
								width='14'
								height='14'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='6 9 6 2 18 2 18 9' />
								<path d='M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2' />
								<rect x='6' y='14' width='12' height='8' />
							</svg>
							Ремонт принтеров и МФУ
						</Link>
						<Link href='/remont/noutbuk' className={styles.dropdownLink}>
							<svg
								width='14'
								height='14'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<rect x='2' y='3' width='20' height='14' rx='2' />
								<line x1='2' y1='20' x2='22' y2='20' />
							</svg>
							Ремонт ноутбуков
						</Link>
						<Link href='/zapravka' className={styles.dropdownLink}>
							<svg
								width='14'
								height='14'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
								<polyline points='14 2 14 8 20 8' />
							</svg>
							Заправка картриджей
						</Link>
						<Link href='/remont/kompyuter' className={styles.dropdownLink}>
							<svg
								width='14'
								height='14'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<rect x='2' y='3' width='20' height='14' rx='2' />
								<line x1='8' y1='21' x2='16' y2='21' />
								<line x1='12' y1='17' x2='12' y2='21' />
							</svg>
							Ремонт компьютеров
						</Link>
					</div>
				</li>

				<li className={styles.item}>
					<Link href='/brendy' className={styles.link}>
						Бренды
					</Link>
				</li>
				<li className={styles.item}>
					<Link href='/tovary' className={styles.link}>
						Товары
					</Link>
				</li>
				<li className={styles.item}>
					<Link href='/ceny' className={styles.link}>
						Цены
					</Link>
				</li>
				<li className={styles.item}>
					<Link href='/web' className={styles.link}>
						Web <span className={styles.linkBadge}>NEW</span>
					</Link>
				</li>
			</ul>
		</nav>
	)
}
