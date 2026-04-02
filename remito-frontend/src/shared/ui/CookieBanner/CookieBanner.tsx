'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './CookieBanner.module.scss'

const COOKIE_KEY = 'cookie_accepted'

export const CookieBanner = () => {
	const [visible, setVisible] = useState(false)
	const [hiding, setHiding] = useState(false)

	useEffect(() => {
		if (!localStorage.getItem(COOKIE_KEY)) {
			const t = setTimeout(() => setVisible(true), 300)
			return () => clearTimeout(t)
		}
	}, [])

	const handleAccept = () => {
		setHiding(true)
		setTimeout(() => {
			localStorage.setItem(COOKIE_KEY, '1')
			setVisible(false)
			setHiding(false)
		}, 400)
	}

	if (!visible) return null

	return (
		<div
			id='cookieBanner'
			role='region'
			aria-label='Уведомление о cookies'
			className={`
        ${styles.cookie}
        ${hiding ? styles.hiding : styles.isVisible}
      `}
		>
			<div className={`${styles.glow} ${styles.glow1}`} />
			<div className={`${styles.glow} ${styles.glow2}`} />
			<div className={styles.grid} />

			<div className={styles.inner}>
				<span className={styles.icon} aria-hidden='true'>
					🍪
				</span>

				<p className={styles.text}>
					Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
					<Link href='/privacy/' className={styles.link}>
						политикой конфиденциальности
					</Link>
					.
				</p>

				<button type='button' className={styles.btn} onClick={handleAccept}>
					Продолжить
				</button>
			</div>
		</div>
	)
}
