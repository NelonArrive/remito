export { PRODUCTS_DATA } from './model/product.data'

export {
	PRODUCT_CATEGORY_TABS,
	countProductsByCategory,
	getCatalogProducts,
	getInStockProducts,
	getProductHref,
	getProductSpecs,
	getProductVisualBg,
	getProductsByCategory,
	isProductInStock
} from './lib/product.helpers'

export type { ProductSpec } from './lib/product.helpers'

export type {
	Product,
	ProductBadge,
	ProductBadgeType,
	ProductCategorySlug,
	ProductCategoryTab,
	ProductKind,
	ProductPreview
} from './model/product.types'

export { ProductCard } from './ui/ProductCard/ProductCard'
export { ProductCategoryTabs } from './ui/ProductCategoryTabs/ProductCategoryTabs'
export { ProductsCatalog } from './ui/ProductsCatalog/ProductsCatalog'
export { ProductsEmpty } from './ui/ProductsEmpty/ProductsEmpty'
