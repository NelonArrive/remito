'use client'

import { Button, Logo } from '@/shared/ui'
import { IconPhone } from '@/shared/ui/icons'
import { useState } from 'react'
import { Burger } from './Burger/Burger'
import styles from './Header.module.scss'
import { MobileMenu } from './MobileMenu/MobileMenu'
import { Nav } from './Nav/Nav'
import { Topbar } from './Topbar/Topbar'

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [popupOpen, setPopupOpen] = useState(false)

	return (
		<>
			<Topbar />

			<header className={styles.header}>
				<div className='container'>
					<Logo />
					<Nav />

					<div className={styles.right}>
						<div className={styles.phoneBlock}>
							<a href='tel:+73431234567' className={styles.phone}>
								+7 (343) 123-45-67
							</a>
							<span className={styles.phoneSub}>Бесплатный вызов</span>
						</div>

						<Button
							variant='cta'
							icon={<IconPhone />}
							aria-label='Вызвать мастера'
							className={styles.ctaBtn}
							onClick={() => setPopupOpen(true)}
						>
							Вызвать мастера
						</Button>

						<Burger isOpen={menuOpen} onClick={() => setMenuOpen(v => !v)} />
					</div>
				</div>
			</header>

			<MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
		</>
	)
}
