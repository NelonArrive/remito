'use client'

import { CONTACTS } from '@/entities/legal'
import { WEB_NAV } from '@/widgets/Header/model/header-nav'
import { Button } from '@/shared/ui/Button'
import { IconPhone } from '@/shared/ui/Icons'
import { Logo } from '@/shared/ui/Logo'
import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Burger } from './Burger/Burger'
import styles from './Header.module.scss'
import { MobileMenu } from './MobileMenu/MobileMenu'
import { Nav } from './Nav/Nav'
import { Topbar } from './Topbar/Topbar'

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const pathname = usePathname()
	const isWeb = pathname?.startsWith('/web')

	useEffect(() => {
		setMenuOpen(false)
	}, [pathname])

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [menuOpen])

	return (
		<>
			<Topbar isWeb={isWeb} />

			<header className={`${styles.header} ${isWeb ? styles.headerWeb : ''}`}>
				<div className='container'>
					<Logo href={isWeb ? WEB_NAV.home : '/'} slogan={isWeb ? 'Разработка сайтов' : undefined} />

					<Nav mode={isWeb ? 'web' : 'default'} />

					<div className={styles.right}>
						<div className={styles.phoneBlock}>
							<a href={`tel:${CONTACTS.phoneRaw}`} className={styles.phone}>
								{CONTACTS.phone}
							</a>
							<span className={styles.phoneSub}>{isWeb ? 'Консультация' : 'Бесплатный вызов'}</span>
						</div>

						<Button
							variant='cta'
							icon={isWeb ? <MessageCircle size={15} /> : <IconPhone />}
							aria-label={isWeb ? 'Обсудить проект' : 'Вызвать мастера'}
							className={styles.ctaBtn}
							data-popup='open'
						>
							<span className={styles.ctaTextFull}>{isWeb ? 'Обсудить проект' : 'Вызвать мастера'}</span>
							<span className={styles.ctaTextShort}>{isWeb ? 'Заявка' : 'Вызов'}</span>
						</Button>

						<Burger isOpen={menuOpen} onClick={() => setMenuOpen(v => !v)} />
					</div>
				</div>
			</header>

			<MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isWeb={isWeb} />
		</>
	)
}
