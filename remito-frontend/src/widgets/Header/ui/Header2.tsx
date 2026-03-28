'use client'

// widgets/Header/Header.tsx

import { NAV_LINKS } from '@/shared/config/nav.config'
import { Button } from '@shared/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import s from './Header.module.scss'

export default function Header() {
	const pathname = usePathname()
	const [menuOpen, setMenuOpen] = useState(false)
	const [accordionOpen, setAccordionOpen] = useState(false)

	// Закрытие по Escape
	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') setMenuOpen(false)
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	// Блокировка скролла при открытом меню
	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [menuOpen])

	// Закрываем при смене роута
	useEffect(() => {
		setMenuOpen(false)
	}, [pathname])

	return (
		<>
			{/* Топ-бар */}
			<div className={s.topbar}>
				<div className={s.topbarInner}>
					<div className={s.topbarLeft}>
						<span className={s.topbarItem}>
							<svg
								width='12'
								height='12'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
								<circle cx='12' cy='10' r='3' />
							</svg>
							{SITE_CONFIG.city}
						</span>
						<span className={s.topbarItem}>
							<svg
								width='12'
								height='12'
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
							{SITE_CONFIG.hours}
						</span>
						<span className={s.topbarBadge}>Выезд за 1 час</span>
					</div>
					<div className={s.topbarRight}>
						<Link href='/kontakty/' className={s.topbarLink}>
							Контакты
						</Link>
						<Link href='/blog/' className={s.topbarLink}>
							Блог
						</Link>
					</div>
				</div>
			</div>

			{/* Основной хедер */}
			<header className={`${s.header} ${className ?? ''}`}>
				<div className={s.headerInner}>
					{/* Логотип */}
					<Link href='/' className={s.logo}>
						<div className={s.logoIcon}>R</div>
						<div className={s.logoText}>
							<span className={s.logoName}>
								Remi<span>to</span>
							</span>
							<span className={s.logoSlogan}>Ремонт оргтехники</span>
						</div>
					</Link>

					{/* Навигация */}
					<nav className={s.nav} aria-label='Основная навигация'>
						{NAV_LINKS.map(link => (
							<div key={link.href} className={s.navItem}>
								{link.children ? (
									<>
										<span className={`${s.navLink} ${pathname.startsWith(link.href) ? s.active : ''}`}>
											{link.label}
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
										</span>
										<div className={s.dropdown}>
											{link.children.map(child => (
												<Link key={child.href} href={child.href} className={s.dropdownLink}>
													{child.label}
												</Link>
											))}
										</div>
									</>
								) : (
									<Link href={link.href} className={`${s.navLink} ${pathname === link.href ? s.active : ''}`}>
										{link.label}
										{link.badge && <span className={s.navBadge}>{link.badge}</span>}
									</Link>
								)}
							</div>
						))}
					</nav>

					{/* Правая часть */}
					<div className={s.headerRight}>
						<Link href={`tel:${SITE_CONFIG.phoneRaw}`} className={s.phone}>
							<span className={s.phoneNum}>{SITE_CONFIG.phone}</span>
							<span className={s.phoneSub}>Бесплатный вызов</span>
						</Link>

						<Button
							variant='cta'
							href='#zayavka'
							iconLeft={<img src='/img/svg/phone.svg' width={14} height={14} alt='' aria-hidden='true' />}
						>
							<span>Вызвать мастера</span>
						</Button>

						{/* Бургер */}
						<button
							className={`${s.burger} ${menuOpen ? s.open : ''}`}
							onClick={() => setMenuOpen(v => !v)}
							aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
							aria-expanded={menuOpen}
						>
							<span className={s.burgerLine} />
							<span className={s.burgerLine} />
							<span className={s.burgerLine} />
						</button>
					</div>
				</div>
			</header>

			{/* Оверлей */}
			<div className={`${s.overlay} ${menuOpen ? s.open : ''}`} onClick={() => setMenuOpen(false)} aria-hidden='true' />

			{/* Мобильное меню */}
			<nav
				className={`${s.mobileMenu} ${menuOpen ? s.open : ''}`}
				aria-label='Мобильная навигация'
				aria-hidden={!menuOpen}
			>
				<div className={s.mobileMenuHead}>
					<Link href='/' className={s.logo}>
						<div className={s.logoIcon}>R</div>
						<div className={s.logoText}>
							<span className={s.logoName}>
								Remi<span>to</span>
							</span>
						</div>
					</Link>
					<button className={s.mobileMenuClose} onClick={() => setMenuOpen(false)} aria-label='Закрыть меню'>
						<svg
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='18' y1='6' x2='6' y2='18' />
							<line x1='6' y1='6' x2='18' y2='18' />
						</svg>
					</button>
				</div>

				<div className={s.mobileNav}>
					{NAV_LINKS.map(link => (
						<div key={link.href}>
							{link.children ? (
								<>
									<button
										className={s.mobileNavLink}
										onClick={() => setAccordionOpen(v => !v)}
										aria-expanded={accordionOpen}
									>
										{link.label}
										<svg
											width='14'
											height='14'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
											style={{ transform: accordionOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
										>
											<polyline points='6 9 12 15 18 9' />
										</svg>
									</button>
									<div className={`${s.mobileAccordion} ${accordionOpen ? s.open : ''}`}>
										{link.children.map(child => (
											<Link key={child.href} href={child.href} className={s.mobileSubLink}>
												{child.label}
											</Link>
										))}
									</div>
								</>
							) : (
								<Link href={link.href} className={s.mobileNavLink}>
									{link.label}
									{link.badge && <span className={s.navBadge}>{link.badge}</span>}
								</Link>
							)}
						</div>
					))}
				</div>

				<div className={s.mobileMenuFooter}>
					<Link href={`tel:${SITE_CONFIG.phoneRaw}`} className={s.mobilePhone}>
						<svg
							width='18'
							height='18'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z' />
						</svg>
						{SITE_CONFIG.phone}
					</Link>
					<Button
						variant='cta'
						href='#zayavka'
						onClick={() => setMenuOpen(false)}
						iconLeft={<img src='/img/svg/phone.svg' width={15} height={15} alt='' aria-hidden='true' />}
					>
						Оставить заявку
					</Button>
				</div>
			</nav>
		</>
	)
}
