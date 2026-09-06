export type WebServiceSlug = 'landing' | 'sayt-vizitka' | 'korporativnyy-sayt' | 'internet-magazin'

export type WebTariffId = 'start' | 'business' | 'pro'

export interface WebService {
	id: WebServiceSlug
	slug: WebServiceSlug
	title: string
	shortTitle: string
	description: string
	previewText: string
	priceFrom: number
	pages: string
	days: string
	href: string
	icon: 'Layout' | 'Globe' | 'Building2' | 'ShoppingCart'
	color: string
	colorLight: string
}

export interface WebServiceFaqItem {
	question: string
	answer: string
}

export interface WebServiceDetail extends WebService {
	heroSubtitle: string
	includes: string[]
	faq: WebServiceFaqItem[]
}

export interface WebTariff {
	id: WebTariffId
	name: string
	priceFrom: number
	description: string
	pages: string
	days: string
	featured?: boolean
	features: string[]
}

export interface WebStep {
	step: number
	title: string
	description: string
	duration: string
}

export interface WebAdvantage {
	title: string
	description: string
	icon: 'Zap' | 'Search' | 'Smartphone' | 'Code2' | 'Headphones'
}

export interface WebFaqItem {
	id: string
	question: string
	answer: string
}

export interface WebPortfolioStub {
	id: string
	title: string
	category: string
	status: 'soon'
}
