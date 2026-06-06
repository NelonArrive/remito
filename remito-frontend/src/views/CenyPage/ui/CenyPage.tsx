'use client'

import { SERVICES_DATA } from '@/entities/service/model/service.data'
import type { Service } from '@/entities/service/model/service.types'
import { Button } from '@/shared/ui/Button'
import { Filter, Info, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import s from './CenyPage.module.scss'

type CategoryId = 'all' | 'printers' | 'cartridges' | 'laptops' | 'pcs' | 'windows' | 'data'

const CATEGORIES: { id: CategoryId; label: string; serviceIds: Service['id'][] }[] = [
	{ id: 'all', label: 'Все услуги', serviceIds: SERVICES_DATA.map(s => s.id) },
	{ id: 'printers', label: 'Принтеры и МФУ', serviceIds: ['remont-printerov'] },
	{ id: 'cartridges', label: 'Картриджи', serviceIds: ['zapravka-kartridzhey'] },
	{ id: 'laptops', label: 'Ноутбуки', serviceIds: ['remont-noutbukov', 'chistka-noutbukov'] },
	{ id: 'pcs', label: 'Компьютеры', serviceIds: ['remont-kompyuterov'] },
	{ id: 'windows', label: 'Windows и ПО', serviceIds: ['ustanovka-windows'] },
	{ id: 'data', label: 'Восстановление данных', serviceIds: ['vosstanovlenie-dannyh'] }
]

function formatPrice(from: number, to?: number): string {
	if (from === 0) return 'Бесплатно'
	if (to) return `от ${from.toLocaleString('ru')} — ${to.toLocaleString('ru')} ₽`
	return `от ${from.toLocaleString('ru')} ₽`
}

export function CenyPage() {
	const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
	const [query, setQuery] = useState('')

	const filteredServices = useMemo(() => {
		const category = CATEGORIES.find(c => c.id === activeCategory)
		const byCategory = category ? SERVICES_DATA.filter(svc => category.serviceIds.includes(svc.id)) : SERVICES_DATA

		if (!query.trim()) return byCategory
		const q = query.toLowerCase()

		return byCategory.filter(service => {
			if (service.title.toLowerCase().includes(q)) return true
			if (service.shortTitle.toLowerCase().includes(q)) return true
			return service.prices.some(p => p.label.toLowerCase().includes(q))
		})
	}, [activeCategory, query])

	return (
		<main className={s.page}>
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>

				<div className={s.heroInner}>
					<span className={s.heroTag}>Цены</span>

					<h1 className={s.heroTitle}>
						Прозрачный <span>прайс</span> на услуги
					</h1>

					<p className={s.heroDesc}>
						Ориентировочные цены на ремонт техники, заправку картриджей, установку Windows и восстановление данных.
						Точную стоимость назовём после диагностики.
					</p>

					<div className={s.heroNote}>
						<Info size={16} />
						<span>Диагностика в большинстве случаев — бесплатно.</span>
					</div>
				</div>
			</section>

			<section className={s.filters}>
				<div className={s.filtersInner}>
					<div className={s.filtersLeft}>
						<div className={s.filtersLabel}>
							<Filter size={16} />
							<span>Фильтр по темам</span>
						</div>

						<div className={s.chips}>
							{CATEGORIES.map(cat => (
								<button
									key={cat.id}
									type='button'
									className={`${s.chip} ${activeCategory === cat.id ? s.chipActive : ''}`}
									onClick={() => setActiveCategory(cat.id)}
								>
									{cat.label}
								</button>
							))}
						</div>
					</div>

					<div className={s.filtersRight}>
						<div className={s.search}>
							<Search size={16} className={s.searchIcon} />
							<input
								type='search'
								placeholder='Найти работу: чистка, диагностика, замена...'
								value={query}
								onChange={e => setQuery(e.target.value)}
								className={s.searchInput}
							/>
						</div>
					</div>
				</div>
			</section>

			<section className={s.tables}>
				<div className={s.tablesInner}>
					{filteredServices.length === 0 ? (
						<div className={s.empty}>
							<p className={s.emptyTitle}>По выбранным фильтрам ничего не найдено</p>
							<p className={s.emptyDesc}>Сбросьте фильтры или измените запрос поиска.</p>
							<Button
								variant='ghost'
								onClick={() => {
									setActiveCategory('all')
									setQuery('')
								}}
							>
								Сбросить фильтры
							</Button>
						</div>
					) : (
						filteredServices.map(service => (
							<article key={service.id} className={s.card}>
								<header className={s.cardHeader}>
									<div className={s.cardTitleWrap}>
										<div
											className={s.cardDot}
											style={{
												backgroundColor: service.color,
												boxShadow: `0 0 0 6px ${service.colorLight}`
											}}
										/>
										<div className={s.cardHeading}>
											<h2 className={s.cardTitle}>{service.shortTitle}</h2>
											<p className={s.cardSubtitle}>{service.previewText}</p>
										</div>
									</div>

									<div className={s.cardAside}>
										<span className={s.cardPill}>Ориентировочные цены</span>
									</div>
								</header>

								<div className={s.tableWrap}>
									<table className={s.table}>
										<thead>
											<tr>
												<th>Работа</th>
												<th className={s.tablePriceCol}>Стоимость</th>
											</tr>
										</thead>
										<tbody>
											{service.prices.map((price, i) => (
												<tr key={i}>
													<td className={s.tableLabelCell}>
														<div className={s.tableLabel}>
															<span>{price.label}</span>
														</div>
													</td>
													<td className={s.tablePrice}>
														<span>{formatPrice(price.from, price.to)}</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								<footer className={s.cardFooter}>
									<p className={s.cardNote}>
										Итоговая стоимость зависит от модели техники и состояния. Скажем честно, если ремонт невыгоден.
									</p>

									<div className={s.cardActions}>
										<Button variant='primary' data-popup='open'>
											Уточнить цену по моей технике
										</Button>
										<Button variant='ghost'>Позвонить</Button>
									</div>
								</footer>
							</article>
						))
					)}
				</div>
			</section>
		</main>
	)
}
