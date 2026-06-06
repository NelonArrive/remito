import {
	WEB_BASE_PATH,
	getWebPortfolioForService,
	type WebServiceDetail
} from '@/entities/web-service'
import { Button } from '@/shared/ui/Button'
import { WebCTA } from '@/widgets/web/WebCTA'
import { WebSection, WebSectionHead } from '@/widgets/web/WebSection'
import { WebServiceFAQ } from '@/widgets/web/WebServiceFAQ'
import { Building2, Calendar, Check, Clock, FileText, Globe, ImageIcon, Layout, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import type { ComponentType, CSSProperties } from 'react'
import s from './WebServicePage.module.scss'

const ICON_MAP: Record<string, ComponentType<{ size?: number }>> = {
	Layout,
	Globe,
	Building2,
	ShoppingCart
}

interface WebServicePageProps {
	service: WebServiceDetail
}

export function WebServicePage({ service }: WebServicePageProps) {
	const Icon = ICON_MAP[service.icon]
	const portfolioItems = getWebPortfolioForService(service.slug)

	const pageStyle = {
		'--web-accent': service.color,
		'--web-accent-light': service.colorLight
	} as CSSProperties

	return (
		<main className={s.page} style={pageStyle}>
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>

				<div className={s.heroInner}>
					<nav className={s.breadcrumbs}>
						<Link href={`${WEB_BASE_PATH}/`}>Remito Web</Link>
						<span>/</span>
						<span>{service.shortTitle}</span>
					</nav>

					<div className={s.heroGrid}>
						<div className={s.heroLeft}>
							{Icon && (
								<div className={s.heroIcon}>
									<Icon size={28} />
								</div>
							)}
							<h1 className={s.heroTitle}>{service.title}</h1>
							<p className={s.heroSubtitle}>{service.heroSubtitle}</p>
							<p className={s.heroDesc}>{service.description}</p>
						</div>

						<div className={s.heroCard}>
							<span className={s.heroCardLabel}>Стоимость и сроки</span>
							<div className={s.heroCardPrice}>от {service.priceFrom.toLocaleString('ru')} ₽</div>
							<ul className={s.heroCardMeta}>
								<li>
									<FileText size={16} />
									{service.pages}
								</li>
								<li>
									<Clock size={16} />
									{service.days}
								</li>
							</ul>
							<Button variant='cta' data-popup='open'>
								Обсудить проект
							</Button>
							<Link href={`${WEB_BASE_PATH}/ceny/`} className={s.heroCardLink}>
								Все тарифы
							</Link>
						</div>
					</div>
				</div>
			</section>

			<WebSection tone='gray'>
				<WebSectionHead
					tag='Состав работ'
					title={
						<>
							Что входит <span>в разработку</span>
						</>
					}
					desc='Фиксируем объём на брифе — без скрытых доплат за базовый функционал.'
					align='left'
				/>
				<ul className={s.includes}>
					{service.includes.map(item => (
						<li key={item} className={s.includesItem}>
							<span className={s.includesIcon}>
								<Check size={16} />
							</span>
							{item}
						</li>
					))}
				</ul>
			</WebSection>

			<WebSection tone='light'>
				<WebSectionHead
					tag='Примеры'
					title={
						<>
							Портфолио <span>скоро</span>
						</>
					}
					desc='Готовим кейсы по этому формату — покажем реальные проекты после запуска.'
					align='left'
				/>
				<div className={s.portfolio}>
					{portfolioItems.map(item => (
						<div key={item.id} className={s.portfolioCard}>
							<div className={s.portfolioImg}>
								<ImageIcon size={28} />
								<span className={s.portfolioSoon}>Скоро</span>
							</div>
							<div className={s.portfolioBody}>
								<span className={s.portfolioCat}>{item.category}</span>
								<h3 className={s.portfolioTitle}>{item.title}</h3>
							</div>
						</div>
					))}
				</div>
			</WebSection>

			<WebSection tone='dark'>
				<div className={s.pricing}>
					<div className={s.pricingLeft}>
						<WebSectionHead
							tag='Стоимость'
							title={
								<>
									Цена и <span>сроки</span>
								</>
							}
							desc='Ориентир по пакету — точную смету согласуем после брифа и уточнения задачи.'
							align='left'
						/>
					</div>
					<div className={s.pricingCard}>
						<div className={s.pricingPrice}>от {service.priceFrom.toLocaleString('ru')} ₽</div>
						<div className={s.pricingRows}>
							<div className={s.pricingRow}>
								<FileText size={18} />
								<span>{service.pages}</span>
							</div>
							<div className={s.pricingRow}>
								<Calendar size={18} />
								<span>{service.days}</span>
							</div>
						</div>
						<p className={s.pricingNote}>
							В стоимость входит дизайн, вёрстка на Next.js, адаптив, базовое SEO и запуск. Интеграции и
							дополнительные модули — по согласованию.
						</p>
						<Button variant='cta' data-popup='open'>
							Получить смету
						</Button>
					</div>
				</div>
			</WebSection>

			<WebServiceFAQ items={service.faq} />
			<WebCTA />
		</main>
	)
}
