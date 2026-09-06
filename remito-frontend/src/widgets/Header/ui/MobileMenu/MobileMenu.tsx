'use client'

import { CONTACTS } from '@/entities/legal'
import { SERVICES_DATA } from '@/entities/service/model/service.data'
import { WEB_NAV, WEB_SERVICE_LINKS } from '@/widgets/Header/model/header-nav'
import { Button } from '@/shared/ui/Button'
import { IconClose } from '@/shared/ui/Icons'
import { Logo } from '@/shared/ui/Logo'
import { MessageCircle } from 'lucide-react'
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
	isWeb?: boolean
}

export const MobileMenu = ({ isOpen, onClose, isWeb = false }: MobileMenuProps) => {
	const [servicesOpen, setServicesOpen] = useState(false)
	const [webOpen, setWebOpen] = useState(false)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
			setServicesOpen(false)
			setWebOpen(false)
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	const toggleServices = () => {
		setServicesOpen(v => !v)
		if (!isWeb) setWebOpen(false)
	}

	const toggleWeb = () => {
		setWebOpen(v => !v)
		setServicesOpen(false)
	}

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
					<Logo compact href={isWeb ? WEB_NAV.home : '/'} slogan={isWeb ? 'Разработка сайтов' : undefined} />
					<button className={styles.close} onClick={onClose} aria-label='Закрыть меню' type='button'>
						<IconClose />
					</button>
				</div>

				<div className={styles.phone}>
					<a href={`tel:${CONTACTS.phoneRaw}`} className={styles.phoneNum}>
						{CONTACTS.phone}
					</a>
					<span className={styles.phoneSub}>{isWeb ? 'Ответим в рабочий день' : 'Бесплатный вызов мастера'}</span>
				</div>

				<nav className={styles.nav}>
					{isWeb ? (
						<>
							<div>
								<button
									type='button'
									className={styles.link}
									onClick={toggleServices}
									aria-expanded={servicesOpen}
								>
									Услуги
									<Chevron open={servicesOpen} />
								</button>
								<div className={`${styles.sub} ${servicesOpen ? styles.subOpen : ''}`}>
									{WEB_SERVICE_LINKS.map(item => (
										<Link key={item.href} href={item.href} className={styles.subLink} onClick={onClose}>
											{item.label}
											<span className={styles.subMeta}>от {item.priceFrom.toLocaleString('ru')} ₽</span>
										</Link>
									))}
									<Link href={WEB_NAV.pricing} className={styles.subLinkAll} onClick={onClose}>
										Тарифы и цены →
									</Link>
								</div>
							</div>
							<Link href={WEB_NAV.home} className={styles.link} onClick={onClose}>
								Remito Web
							</Link>
							<Link href='/' className={styles.link} onClick={onClose}>
								Ремонт техники
							</Link>
						</>
					) : (
						<>
							<div>
								<button
									type='button'
									className={styles.link}
									onClick={toggleServices}
									aria-expanded={servicesOpen}
								>
									Услуги
									<Chevron open={servicesOpen} />
								</button>
								<div className={`${styles.sub} ${servicesOpen ? styles.subOpen : ''}`}>
									{SERVICES_DATA.map(service => (
										<Link
											key={service.slug}
											href={`/uslugi/${service.slug}/`}
											className={styles.subLink}
											onClick={onClose}
										>
											{service.shortTitle}
										</Link>
									))}
									<Link href='/uslugi/' className={styles.subLinkAll} onClick={onClose}>
										Все услуги →
									</Link>
								</div>
							</div>

							<div>
								<button type='button' className={styles.link} onClick={toggleWeb} aria-expanded={webOpen}>
									Web
									<span className={styles.linkBadge}>NEW</span>
									<Chevron open={webOpen} />
								</button>
								<div className={`${styles.sub} ${webOpen ? styles.subOpen : ''} ${styles.subWeb}`}>
									{WEB_SERVICE_LINKS.map(item => (
										<Link key={item.href} href={item.href} className={styles.subLink} onClick={onClose}>
											{item.label}
										</Link>
									))}
									<Link href={WEB_NAV.pricing} className={styles.subLinkAll} onClick={onClose}>
										Цены на сайты →
									</Link>
								</div>
							</div>

							<Link href='/tovary/' className={styles.link} onClick={onClose}>
								Товары
							</Link>
							<Link href='/ceny/' className={styles.link} onClick={onClose}>
								Цены
							</Link>
							<Link href='/o-kompanii/' className={styles.link} onClick={onClose}>
								О компании
							</Link>
						</>
					)}

					<Link href='/blog/' className={styles.link} onClick={onClose}>
						Блог
					</Link>
					<Link href='/kontakty/' className={styles.link} onClick={onClose}>
						Контакты
					</Link>
				</nav>

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
								<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
							</svg>
							Гарантия на работы
						</span>
					</div>
					<Button
						variant='cta'
						icon={isWeb ? <MessageCircle size={15} /> : <PhoneIcon />}
						onClick={onClose}
						className={styles.footerBtn}
						data-popup='open'
					>
						{isWeb ? 'Обсудить проект' : 'Вызвать мастера'}
					</Button>
				</div>
			</div>
		</div>
	)
}

function Chevron({ open }: { open: boolean }) {
	return (
		<svg
			width='14'
			height='14'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2.5'
			strokeLinecap='round'
			strokeLinejoin='round'
			style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}
			aria-hidden
		>
			<polyline points='6 9 12 15 18 9' />
		</svg>
	)
}
