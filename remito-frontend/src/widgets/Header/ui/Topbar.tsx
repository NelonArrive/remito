import Link from 'next/link'
import styles from './Topbar.module.scss'

export const Topbar = () => {
	return (
		<div className={styles.topbar}>
			<div className='container'>
				<div className={styles.left}>
					<span className={`${styles.item} ${styles.itemCity}`}>
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
							<path d='M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z' />
							<circle cx='12' cy='10' r='3' />
						</svg>
						Екатеринбург
					</span>

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
							<polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
						</svg>
						Выезд за 1 час
					</span>
				</div>

				<div className={styles.right}>
					<span className={styles.badge}>Принимаем заявки</span>
					<Link href='/kontakty' className={styles.link}>
						Контакты
					</Link>
					<Link href='/blog' className={styles.link}>
						Блог
					</Link>
				</div>
			</div>
		</div>
	)
}
