export interface SeoMeta {
	title: string
	description: string
	keywords?: string
	ogImage?: string
}

export interface BreadcrumbItem {
	label: string
	href?: string
}

export interface NavLink {
	label: string
	href: string
	badge?: string
	children?: NavLink[]
}
