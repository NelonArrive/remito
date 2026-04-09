'use client'

import { Button } from '@/shared/ui/Button'
import { IconClose } from '@/shared/ui/Icons'
import { Logo } from '@/shared/ui/Logo'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './MobileMenu.module.scss'

const PhoneIcon = () => (
	<svg
		width='15'
		height='15'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2.5'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z' />
	</svg>
)

interface MobileMenuProps {
	isOpen: boolean
	onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
	const [servicesOpen, setServicesOpen] = useState(false)

	// Блокируем скролл body когда меню открыто
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
			setServicesOpen(false)
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<div
			className={`${styles.mobileMenu} ${isOpen ? styles.isOpen : ''}`}
			role='dialog'
			aria-modal='true'
			aria-label='Меню навигации'
		>
			<div className={styles.overlay} onClick={onClose} />

			<div className={styles.panel}>
				<div className={styles.head}>
					<Logo compact />
					<button className={styles.close} onClick={onClose} aria-label='Закрыть меню'>
						<IconClose />
					</button>
				</div>

				{/* Phone */}
				<div className={styles.phone}>
					<a href='tel:+73431234567' className={styles.phoneNum}>
						+7 (343) 123-45-67
					</a>
					<span className={styles.phoneSub}>Бесплатный вызов мастера</span>
				</div>

				<nav className={styles.nav}>
					<div>
						<button className={styles.link} onClick={() => setServicesOpen(v => !v)} aria-expanded={servicesOpen}>
							Услуги
							<svg
								width='14'
								height='14'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2.5'
								strokeLinecap='round'
								strokeLinejoin='round'
								style={{ transition: 'transform .2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }}
							>
								<polyline points='6 9 12 15 18 9' />
							</svg>
						</button>

						<div className={`${styles.sub} ${servicesOpen ? styles.subOpen : ''}`}>
							<Link href='/remont/printer' className={styles.subLink} onClick={onClose}>
								<svg
									width='13'
									height='13'
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
							<Link href='/remont/noutbuk' className={styles.subLink} onClick={onClose}>
								<svg
									width='13'
									height='13'
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
							<Link href='/zapravka' className={styles.subLink} onClick={onClose}>
								<svg
									width='13'
									height='13'
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
							<Link href='/remont/kompyuter' className={styles.subLink} onClick={onClose}>
								<svg
									width='13'
									height='13'
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
					</div>

					<Link href='/brendy' className={styles.link} onClick={onClose}>
						Бренды
					</Link>
					<Link href='/tovary' className={styles.link} onClick={onClose}>
						Товары
					</Link>
					<Link href='/ceny' className={styles.link} onClick={onClose}>
						Цены
					</Link>
					<Link href='/web' className={styles.link} onClick={onClose}>
						Web
						<span className={styles.linkBadge} style={{ marginLeft: 'auto' }}>
							NEW
						</span>
					</Link>
					<Link href='/blog' className={styles.link} onClick={onClose}>
						Блог
					</Link>
					<Link href='/kontakty' className={styles.link} onClick={onClose}>
						Контакты
					</Link>
				</nav>

				{/* Footer */}
				<div className={styles.footer}>
					<div className={styles.info}>
						<span className={styles.infoItem}>
							<svg
								width='13'
								height='13'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<circle cx='12' cy='12' r='10' />
								<polyline points='12 6 12 12 16 14' />
							</svg>
							Пн–Вс, 9:00–21:00
						</span>
						<span className={styles.infoItem}>
							<svg
								width='13'
								height='13'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z' />
								<circle cx='12' cy='10' r='3' />
							</svg>
							Екатеринбург
						</span>
					</div>
					<Button variant='cta' icon={<PhoneIcon />} onClick={onClose} className={styles.footerBtn}>
						Вызвать мастера
					</Button>
				</div>
			</div>
		</div>
	)
}
