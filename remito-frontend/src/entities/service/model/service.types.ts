export interface ServiceFaq {
	question: string
	answer: string
}

export interface ServicePrice {
	label: string
	from: number
	to?: number
}

export interface Service {
	id: string
	slug: string
	title: string
	shortTitle: string
	description: string
	previewText: string
	icon: string
	color: string
	colorLight: string
	prices: ServicePrice[]
	includes: string[]
	faq: ServiceFaq[]
}
