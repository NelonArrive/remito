import { PRODUCTS_DATA } from '../model/product.data'
import type { Product, ProductCategorySlug, ProductCategoryTab } from '../model/product.types'

export const PRODUCT_CATEGORY_TABS: ProductCategoryTab[] = [
	{ id: 'all', label: 'Все товары' },
	{ id: 'laser', label: 'Лазерные', emoji: '🖨' },
	{ id: 'inkjet', label: 'Струйные', emoji: '💧' },
	{ id: 'drum', label: 'Фотобарабаны', emoji: '⚙️' }
]

export const getCatalogProducts = (products: Product[] = PRODUCTS_DATA) =>
	products.filter(product => product.isActive)

export const getInStockProducts = (products: Product[] = PRODUCTS_DATA) =>
	products.filter(product => product.isActive && product.stockQuantity > 0)

export const getProductsByCategory = (
	category: ProductCategorySlug,
	products: Product[] = getCatalogProducts()
) => (category === 'all' ? products : products.filter(product => product.categorySlug === category))

export const countProductsByCategory = (
	category: ProductCategorySlug,
	products: Product[] = getCatalogProducts()
) => getProductsByCategory(category, products).length

export const isProductInStock = (product: Product) => product.isActive && product.stockQuantity > 0

export const getProductHref = (product: Product) => `/tovary/${product.slug}/`

export interface ProductSpec {
	key: string
	label: string
	colorHex?: string
}

export const getProductSpecs = (product: Product): ProductSpec[] => {
	const specs: ProductSpec[] = [
		{
			key: 'color',
			label: product.colorName,
			colorHex: product.colorHex
		}
	]

	if (product.pageYield) {
		specs.push({
			key: 'yield',
			label: `${product.pageYield.toLocaleString('ru')} стр.`
		})
	}

	if (product.volumeMl) {
		specs.push({
			key: 'volume',
			label: `${product.volumeMl} мл`
		})
	}

	specs.push({
		key: 'category',
		label: product.categoryName
	})

	return specs
}

export const getProductVisualBg = (product: Product) =>
	product.visualBg ?? `color-mix(in srgb, ${product.colorHex} 8%, var(--color-bg-gray))`
