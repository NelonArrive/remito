'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FormPopup, type FormPopupVariant } from './FormPopup'

const POPUP_SELECTOR = '[data-popup="open"]'

export function FormPopupProvider() {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	const variant: FormPopupVariant = pathname?.startsWith('/web') ? 'web' : 'repair'

	const open = useCallback(() => setIsOpen(true), [])
	const close = useCallback(() => setIsOpen(false), [])

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null
			const trigger = target?.closest(POPUP_SELECTOR)

			if (!trigger) return

			event.preventDefault()
			open()
		}

		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [open])

	useEffect(() => {
		if (typeof window === 'undefined') return

		if (window.location.hash === '#zayavka') {
			open()
			window.history.replaceState(null, '', window.location.pathname + window.location.search)
		}
	}, [pathname, open])

	useEffect(() => {
		if (!isOpen) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') close()
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, close])

	return <FormPopup isOpen={isOpen} onClose={close} variant={variant} />
}
