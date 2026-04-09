export type FaqCategory = 'all' | 'repair' | 'price' | 'cart' | 'guarant' | 'work'

export interface FaqItem {
	id: string
	index: string
	question: string
	category: Exclude<FaqCategory, 'all'>
	catLabel: string
	answer: React.ReactNode
}

export interface FaqTab {
	id: FaqCategory
	label: string
}
