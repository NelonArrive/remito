import { CookieBanner } from '@/shared/ui/CookieBanner'
import { FormPopupProvider } from '@/shared/ui/FormPopup'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import '@/shared/styles/globals.scss'

const inter = Manrope({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font',
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Ремито | Ремонт и обслуживание компьютеров и принтеров в Екатеринбурге',
	description:
		'Профессиональный ремонт принтеров, МФУ, ноутбуков и компьютеров. Диагностика бесплатно, гарантия на работы, выезд в удобное время.',
	keywords: 'ремонт принтера Екатеринбург, заправка картриджей, ремонт МФУ, ремонт ноутбука'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' className={inter.variable}>
			<body>
				<Header />
				{children}
				<Footer />
				<FormPopupProvider />
				<CookieBanner />
			</body>
		</html>
	)
}
