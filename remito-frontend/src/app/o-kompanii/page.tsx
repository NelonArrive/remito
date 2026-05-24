import { AboutPage } from '@/pages/AboutPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'О компании — Remito | Ремонт оргтехники в Екатеринбурге',
	description:
		'Remito —  сервис по ремонту принтеров, МФУ и ноутбуков в Екатеринбурге с 2016 года. Работаем честно, с гарантией 90 дней и бесплатной диагностикой.',
	openGraph: {
		title: 'О компании —  Remito',
		description: 'Ремонтируем оргтехнику с 2016 года. Выезд за 1 час, гарантия 90 дней.',
		url: 'https://remito.ru/o-kompanii/'
	}
}

export default function Page() {
	return <AboutPage />
}
