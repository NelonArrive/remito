'use client'

import { getCatalogProducts, getInStockProducts, ProductsCatalog } from '@/entities/product'
import { IconArrowRight } from '@/shared/ui/Icons'
import Link from 'next/link'
import styles from './Products.module.scss'

export const Products = () => {
	const catalogCount = getCatalogProducts().length
	const inStockCount = getInStockProducts().length

	const handleQuickView = (id: number) => {
		console.log('quick view:', id)
	}

	return (
		<section className={styles.products}>
			<div className='container'>
				<div className={styles.head}>
					<div className={styles.headLeft}>
						<span className={styles.tag}>Наши товары</span>
						<h2 className={styles.title}>
							Картриджи и расходники
							<br />
							<span>
								{catalogCount === 0
									? 'скоро в продаже'
									: inStockCount > 0
										? 'в наличии'
										: 'ожидаем поставку'}
							</span>
						</h2>
						{catalogCount > 0 && inStockCount > 0 && (
							<p className={styles.subtitle}>{inStockCount} позиций на складе</p>
						)}
					</div>
					{catalogCount > 0 && (
						<div className={styles.headRight}>
							<Link href='/tovary/' className={styles.btnGhost}>
								Весь каталог
								<IconArrowRight />
							</Link>
						</div>
					)}
				</div>

				<ProductsCatalog
					layout='carousel'
					tabsClassName={styles.tabs}
					swiperClassName={styles.swiper}
					onQuickView={handleQuickView}
				/>
			</div>
		</section>
	)
}
