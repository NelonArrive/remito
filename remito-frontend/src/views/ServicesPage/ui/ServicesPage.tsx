import { CONTACTS } from '@/entities/legal'
import { SERVICES_DATA } from '@/entities/service/model/service.data'
import type { Service } from '@/entities/service/model/service.types'
import { Button } from '@/shared/ui/Button'
import btnStyles from '@/shared/ui/Button/Button.module.scss'
import { AppWindow, ArrowRight, Droplets, HardDrive, Laptop, Monitor, Phone, Printer, Wind } from 'lucide-react'
import Link from 'next/link'
import s from './ServicesPage.module.scss'

const ICON_MAP: Record<string, React.ReactNode> = {
	Printer: <Printer size={24} />,
	Droplets: <Droplets size={24} />,
	Laptop: <Laptop size={24} />,
	Monitor: <Monitor size={24} />,
	Wind: <Wind size={24} />,
	AppWindow: <AppWindow size={24} />,
	HardDrive: <HardDrive size={24} />
}

function ServiceCard({ service }: { service: Service }) {
	const minPrice = service.prices.find(p => p.from === 0) ? null : Math.min(...service.prices.map(p => p.from))

	return (
		<Link
			href={`/uslugi/${service.slug}/`}
			className={s.card}
			style={
				{
					'--service-color': service.color,
					'--service-color-light': service.colorLight
				} as React.CSSProperties
			}
		>
			<div className={s.cardIcon}>{ICON_MAP[service.icon]}</div>

			<h2 className={s.cardTitle}>{service.title}</h2>
			<p className={s.cardDesc}>{service.previewText}</p>

			<div className={s.cardFooter}>
				<div className={s.cardPrice}>
					{minPrice ? (
						<>
							<span className={s.cardPriceLabel}>от</span>
							<span className={s.cardPriceVal}>{minPrice.toLocaleString('ru')} ₽</span>
						</>
					) : (
						<span className={s.cardPriceVal}>Бесплатно</span>
					)}
				</div>
				<span className={s.cardLink}>
					Подробнее
					<ArrowRight size={14} className={s.cardArrow} />
				</span>
			</div>
		</Link>
	)
}

export function ServicesPage() {
	return (
		<main className={s.page}>
			{/* Hero */}
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>
				<div className={s.heroInner}>
					<span className={s.heroTag}>Услуги</span>
					<h1 className={s.heroTitle}>
						Всё что мы <span>умеем делать</span>
					</h1>
					<p className={s.heroDesc}>
						Ремонт оргтехники и ноутбуков, заправка картриджей, настройка Windows. Выезд в удобное время — домой или в офис.
					</p>
				</div>
			</section>

			{/* Grid */}
			<section className={s.section}>
				<div className={s.container}>
					<div className={s.grid}>
						{SERVICES_DATA.map(service => (
							<ServiceCard key={service.id} service={service} />
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className={s.cta}>
				<div className={s.ctaInner}>
					<div className={s.ctaLeft}>
						<h2 className={s.ctaTitle}>Не нашли нужную услугу?</h2>
						<p className={s.ctaDesc}>Позвоните — разберёмся вместе.</p>
					</div>
					<div className={s.ctaBtns}>
						<Button variant='cta' data-popup='open' icon={<Phone size={15} />}>
							Оставить заявку
						</Button>
						<a href={`tel:${CONTACTS.phoneRaw}`} className={`${btnStyles.btn} ${btnStyles.ghost}`}>
							{CONTACTS.phone}
						</a>
					</div>
				</div>
			</section>
		</main>
	)
}
