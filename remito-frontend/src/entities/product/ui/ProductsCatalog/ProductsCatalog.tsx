'use client'

import { useMemo, useState } from 'react'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	getCatalogProducts,
	getInStockProducts,
	getProductsByCategory
} from '../../lib/product.helpers'
import type { ProductCategorySlug } from '../../model/product.types'
import { ProductCard } from '../ProductCard/ProductCard'
import { ProductCategoryTabs } from '../ProductCategoryTabs/ProductCategoryTabs'
import { ProductsEmpty } from '../ProductsEmpty/ProductsEmpty'
import styles from './ProductsCatalog.module.scss'

interface ProductsCatalogProps {
	layout: 'carousel' | 'grid'
	tabsClassName?: string
	swiperClassName?: string
	gridClassName?: string
	onQuickView?: (id: number) => void
}

export function ProductsCatalog({
	layout,
	tabsClassName = '',
	swiperClassName = '',
	gridClassName = '',
	onQuickView
}: ProductsCatalogProps) {
	const [activeTab, setActiveTab] = useState<ProductCategorySlug>('all')
	const catalog = getCatalogProducts()
	const inStockCount = getInStockProducts().length

	const filtered = useMemo(() => getProductsByCategory(activeTab), [activeTab])

	if (catalog.length === 0) {
		return <ProductsEmpty compact={layout === 'carousel'} />
	}

	return (
		<>
			{inStockCount === 0 && (
				<p className={styles.stockNote}>Позиции в каталоге — ожидаем поставку на склад</p>
			)}

			<ProductCategoryTabs activeTab={activeTab} onChange={setActiveTab} className={tabsClassName} />

			{layout === 'carousel' ? (
				<Swiper
					className={`${styles.swiper} ${swiperClassName}`}
					modules={[Navigation, FreeMode]}
					freeMode
					slidesPerView={1.1}
					spaceBetween={16}
					breakpoints={{
						480: { slidesPerView: 1.5 },
						640: { slidesPerView: 2.2 },
						900: { slidesPerView: 3.2 },
						1200: { slidesPerView: 4, freeMode: false }
					}}
				>
					{filtered.map(product => (
						<SwiperSlide key={product.id}>
							<ProductCard product={product} onQuickView={onQuickView} />
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<div className={`${styles.grid} ${gridClassName}`}>
					{filtered.map(product => (
						<ProductCard key={product.id} product={product} onQuickView={onQuickView} />
					))}
				</div>
			)}
		</>
	)
}
