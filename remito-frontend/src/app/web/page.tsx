import { WebHomePage } from '@/views/WebHomePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Remito Web — разработка сайтов в Екатеринбурге | Next.js',
	description:
		'Лендинги, сайты-визитки, корпоративные сайты и интернет-магазины на Next.js. Быстро, с SEO и адаптивом. Remito Web — направление веб-разработки сервиса Remito.',
	openGraph: {
		title: 'Remito Web — сайты, которые работают',
		description: 'Разработка сайтов на Next.js: лендинги, визитки, корпоративные проекты и интернет-магазины.',
		url: 'https://ремито.рф/web/',
		type: 'website'
	}
}

export default function Page() {
	return <WebHomePage />
}
