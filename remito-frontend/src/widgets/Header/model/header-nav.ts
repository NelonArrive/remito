import { WEB_BASE_PATH, WEB_SERVICES } from '@/entities/web-service'

export const WEB_SERVICE_LINKS = WEB_SERVICES.map(service => ({
	href: service.href,
	label: service.title,
	priceFrom: service.priceFrom
}))

export const WEB_NAV = {
	home: `${WEB_BASE_PATH}/`,
	pricing: `${WEB_BASE_PATH}/ceny/`
} as const
