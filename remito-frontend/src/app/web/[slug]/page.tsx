import { getWebServiceBySlug, WEB_SERVICES } from '@/entities/web-service'
import { WebServicePage } from '@/views/WebServicePage'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	return WEB_SERVICES.map(service => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const service = getWebServiceBySlug(slug)

	if (!service) return {}

	return {
		title: `${service.title} — Remito Web | разработка сайтов`,
		description: `${service.heroSubtitle}. ${service.description} От ${service.priceFrom.toLocaleString('ru')} ₽, ${service.days}.`,
		openGraph: {
			title: `${service.title} — Remito Web`,
			description: service.previewText,
			url: `https://ремито.рф/web/${service.slug}/`,
			type: 'website'
		}
	}
}

export default async function Page({ params }: Props) {
	const { slug } = await params
	const service = getWebServiceBySlug(slug)

	if (!service) notFound()

	return <WebServicePage service={service} />
}
