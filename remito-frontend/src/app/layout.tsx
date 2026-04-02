import '@/shared/styles/globals.scss'
import { CookieBanner } from '@/shared/ui'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import type { Metadata } from 'next'
import { Golos_Text } from 'next/font/google'

const golos = Golos_Text({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800', '900'],
	variable: '--font',
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Ремито | Ремонт и обслуживание компьютеров и принтеров в Екатеринбурге',
	description:
		'Профессиональный ремонт принтеров, МФУ, ноутбуков и компьютеров. Выезд за 1 час, диагностика бесплатно, гарантия 90 дней.',
	keywords: 'ремонт принтера Екатеринбург, заправка картриджей, ремонт МФУ, ремонт ноутбука'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' className={golos.variable}>
			<body>
				<Header />
				{children}
				<Footer />
				<CookieBanner />
			</body>
		</html>
	)
}
