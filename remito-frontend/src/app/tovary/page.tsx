import { HomePage } from '@/pages/HomePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Ремито | Ремонт и обслуживание компьютеров и принтеров в Екатеринбурге',
	description:
		'Профессиональный ремонт принтеров, МФУ, ноутбуков и компьютеров. Выезд за 1 час, диагностика бесплатно, гарантия 90 дней.',
	keywords: 'ремонт принтера Екатеринбург, заправка картриджей, ремонт МФУ, ремонт ноутбука'
}

export default function Home() {
	return <HomePage />
}
