'use client'

import { getCatalogProducts, getInStockProducts, ProductsCatalog } from '@/entities/product'
import { Button } from '@/shared/ui/Button'
import { Bell } from 'lucide-react'
import s from './ProductsPage.module.scss'

export function ProductsPage() {
	const catalog = getCatalogProducts()
	const inStock = getInStockProducts()
	const hasCatalog = catalog.length > 0

	return (
		<main className={s.page}>
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>
				<div className={s.heroInner}>
					<span className={s.heroTag}>Товары</span>
					<h1 className={s.heroTitle}>
						Картриджи и <span>расходники</span>
					</h1>
					<p className={s.heroDesc}>
						Оригинальные и совместимые картриджи, чернила и фотобарабаны. Доставка по Екатеринбургу.
					</p>
				</div>
			</section>

			<section className={s.section}>
				<div className={s.container}>
					{hasCatalog && (
						<div className={s.catalogHead}>
							<div>
								<h2 className={s.catalogTitle}>Каталог</h2>
								<p className={s.catalogDesc}>
									{catalog.length} позиций · {inStock.length > 0 ? `${inStock.length} в наличии` : 'ожидаем поставку'}
								</p>
							</div>
						</div>
					)}

					<ProductsCatalog layout='grid' tabsClassName={s.tabs} gridClassName={s.grid} />

					<div className={s.notify}>
						<div className={s.notifyLeft}>
							<div className={s.notifyTitle}>
								<Bell size={16} />
								Уведомить о поступлении
							</div>
							<p className={s.notifyDesc}>Оставьте телефон — сообщим, когда нужный картридж появится на складе</p>
						</div>
						<div className={s.notifyForm}>
							<input type='tel' placeholder='+7 (000) 000-00-00' className={s.notifyInput} />
							<Button variant='primary'>Уведомить</Button>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
