'use client'

import { Cookie } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './CookieBanner.module.scss'

const COOKIE_KEY = 'cookie_accepted'

export const CookieBanner = () => {
	const [visible, setVisible] = useState(false)
	const [hiding, setHiding] = useState(false)

	useEffect(() => {
		if (!localStorage.getItem(COOKIE_KEY)) {
			const t = setTimeout(() => setVisible(true), 400)
			return () => clearTimeout(t)
		}
	}, [])

	const handleAccept = () => {
		setHiding(true)
		setTimeout(() => {
			localStorage.setItem(COOKIE_KEY, '1')
			setVisible(false)
			setHiding(false)
		}, 350)
	}

	if (!visible) return null

	return (
		<div
			role='region'
			aria-label='Уведомление о cookies'
			className={`${styles.banner} ${hiding ? styles.hiding : styles.visible}`}
		>
			<div className={styles.shell}>
				<div className={styles.accent} aria-hidden />
				<div className={styles.glow1} aria-hidden />
				<div className={styles.glow2} aria-hidden />
				<div className={styles.grid} aria-hidden />

				<div className={styles.inner}>
					<div className={styles.iconWrap} aria-hidden>
						<Cookie size={20} />
					</div>

					<p className={styles.text}>
						Мы используем cookie для работы сайта и аналитики. Продолжая, вы соглашаетесь с{' '}
						<Link href='/privacy/' className={styles.link}>
							политикой конфиденциальности
						</Link>
						.
					</p>

					<button type='button' className={styles.btn} onClick={handleAccept}>
						Понятно
					</button>
				</div>
			</div>
		</div>
	)
}
