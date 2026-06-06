/** Slug категории для фильтров в UI */
export type ProductCategorySlug = 'laser' | 'inkjet' | 'drum' | 'all'

/** Тип расходника — гибкая классификация помимо categoryName с бэка */
export type ProductKind = 'cartridge' | 'ink' | 'drum' | 'toner' | 'paper' | 'other'

export type ProductBadgeType = 'hit' | 'new' | 'sale' | 'original' | 'compat'

export interface ProductBadge {
	type: ProductBadgeType
	label: string
}

/**
 * ProductDto с бэка + поля витрины (badges, pageYield и т.д.).
 */
export interface Product {
	id: number
	name: string
	slug: string
	description: string
	price: number
	stockQuantity: number
	categoryName: string
	brandName: string
	colorName: string
	colorHex: string
	imageUrl: string
	isActive: boolean

	/** Slug категории для табов */
	categorySlug: Exclude<ProductCategorySlug, 'all'>
	/** cartridge | ink | drum … */
	productKind: ProductKind
	/** Ресурс в страницах (лазер, барабан) */
	pageYield?: number
	/** Объём чернил, мл */
	volumeMl?: number
	/** Совместимость для карточки */
	compatibility: string
	/** Старая цена для акций */
	priceOld?: number
	/** Хит / новинка / скидка / оригинал */
	badges: ProductBadge[]
	/** Фон превью карточки */
	visualBg?: string
	/** Оригинальный расходник */
	isOriginal?: boolean
}

export interface ProductCategoryTab {
	id: ProductCategorySlug
	label: string
	emoji?: string
}

export type ProductPreview = Pick<
	Product,
	| 'id'
	| 'name'
	| 'slug'
	| 'price'
	| 'priceOld'
	| 'stockQuantity'
	| 'brandName'
	| 'categoryName'
	| 'colorName'
	| 'colorHex'
	| 'imageUrl'
	| 'badges'
	| 'pageYield'
	| 'volumeMl'
	| 'compatibility'
	| 'visualBg'
>
