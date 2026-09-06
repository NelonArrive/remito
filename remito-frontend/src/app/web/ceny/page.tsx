import { WebCenyPage } from '@/views/WebCenyPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Цены на разработку сайтов — Remito Web',
	description:
		'Тарифы Remito Web: Старт от 25 000 ₽, Бизнес от 55 000 ₽, Про от 90 000 ₽. Лендинги, корпоративные сайты и интернет-магазины.',
	openGraph: {
		title: 'Цены — Remito Web',
		description: 'Пакеты и ориентировочные цены на разработку сайтов в Екатеринбурге.',
		url: 'https://ремито.рф/web/ceny/',
		type: 'website'
	}
}

export default function Page() {
	return <WebCenyPage />
}
