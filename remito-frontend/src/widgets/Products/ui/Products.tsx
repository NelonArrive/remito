'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IconArrowRight } from '@/shared/ui/Icons'
import { products, tabs } from '../model/products.data'
import { Category } from '../model/products.types'
import { ProductCard } from './ProductCard/ProductCard'
import styles from './Products.module.scss'

const countByCategory = (cat: Category) =>
	cat === 'all' ? products.length : products.filter(p => p.category === cat).length

export const Products = () => {
	const [activeTab, setActiveTab] = useState<Category>('all')

	const filtered = useMemo(
		() => (activeTab === 'all' ? products : products.filter(p => p.category === activeTab)),
		[activeTab]
	)

	const handleQuickView = (id: string) => {
		// TODO: открыть модал быстрого просмотра
		console.log('quick view:', id)
	}

	return (
		<section className={styles.products}>
			<div className='container'>
				{/* Шапка */}
				<div className={styles.head}>
					<div className={styles.headLeft}>
						<span className={styles.tag}>Наши товары</span>
						<h2 className={styles.title}>
							Картриджи и расходники
							<br />
							<span>в наличии</span>
						</h2>
					</div>
					<div className={styles.headRight}>
						<Link href='/tovary' className={styles.btnGhost}>
							Весь каталог
							<IconArrowRight />
						</Link>
					</div>
				</div>

				{/* Табы */}
				<div className={styles.tabs} role='tablist'>
					{tabs.map(tab => (
						<button
							key={tab.id}
							role='tab'
							aria-selected={activeTab === tab.id}
							className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
							onClick={() => setActiveTab(tab.id)}
							type='button'
						>
							{tab.emoji && <span aria-hidden>{tab.emoji}</span>}
							{tab.label}
							<span className={styles.tabCount}>{countByCategory(tab.id)}</span>
						</button>
					))}
				</div>

				<Swiper
					className={styles.swiper}
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
							<ProductCard product={product} onQuickView={handleQuickView} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	)
}
