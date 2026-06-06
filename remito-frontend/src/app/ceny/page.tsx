import { CenyPage } from '@/views/CenyPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Цены на услуги — Remito',
	description:
		'Ориентировочный прайс на ремонт техники, заправку картриджей, установку Windows и восстановление данных.'
}

export default function Page() {
	return <CenyPage />
}
