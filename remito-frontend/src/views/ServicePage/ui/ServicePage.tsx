'use client'

import { CONTACTS } from '@/entities/legal'
import type { Service } from '@/entities/service/model/service.types'
import { Button } from '@/shared/ui/Button'
import { AppWindow, ArrowLeft, Droplets, HardDrive, Laptop, Monitor, Phone, Plus, Printer, Wind } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import s from './ServicePage.module.scss'

const ICON_MAP: Record<string, React.ReactNode> = {
	Printer: <Printer size={26} />,
	Droplets: <Droplets size={26} />,
	Laptop: <Laptop size={26} />,
	Monitor: <Monitor size={26} />,
	Wind: <Wind size={26} />,
	AppWindow: <AppWindow size={26} />,
	HardDrive: <HardDrive size={26} />
}

function formatPrice(from: number, to?: number): string {
	if (from === 0) return 'Бесплатно'
	if (to) return `от ${from.toLocaleString('ru')} — ${to.toLocaleString('ru')} ₽`
	return `от ${from.toLocaleString('ru')} ₽`
}

interface ServicePageProps {
	service: Service
}

export function ServicePage({ service }: ServicePageProps) {
	const [openFaq, setOpenFaq] = useState<number | null>(0)

	return (
		<main
			className={s.page}
			style={
				{
					'--service-color': service.color,
					'--service-color-light': service.colorLight,
					'--service-color-alpha': `${service.color}1A`
				} as React.CSSProperties
			}
		>
			{/* Hero */}
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>

				<div className={s.heroInner}>
					<div className={s.heroLeft}>
						<nav className={s.breadcrumbs}>
							<Link href='/' className={s.breadcrumbLink}>
								Главная
							</Link>
							<span className={s.breadcrumbSep}>/</span>
							<Link href='/uslugi/' className={s.breadcrumbLink}>
								Услуги
							</Link>
							<span className={s.breadcrumbSep}>/</span>
							<span className={s.breadcrumbCurrent}>{service.shortTitle}</span>
						</nav>

						<div className={s.heroIconWrap}>{ICON_MAP[service.icon]}</div>

						<h1 className={s.heroTitle}>{service.title}</h1>
						<p className={s.heroDesc}>{service.description}</p>
					</div>

					{/* Price card — desktop */}
					<div className={s.heroCard}>
						<span className={s.heroCardTitle}>Стоимость услуг</span>
						<div className={s.priceList}>
							{service.prices.map((p, i) => (
								<div key={i} className={s.priceItem}>
									<span className={s.priceItemLabel}>{p.label}</span>
									<span className={s.priceItemVal}>{formatPrice(p.from, p.to)}</span>
								</div>
							))}
						</div>
						<p className={s.heroCardNote}>Точную стоимость назовём после диагностики</p>
					</div>
				</div>
			</section>

			{/* Body */}
			<section className={s.body}>
				<div className={s.container}>
					<div className={s.grid}>
						{/* Left */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
							{/* Что входит */}
							<div className={s.includesCard}>
								<h2 className={s.cardTitle}>Что входит в услугу</h2>
								<ul className={s.includesList}>
									{service.includes.map((item, i) => (
										<li key={i} className={s.includesItem}>
											<span className={s.includesDot} />
											{item}
										</li>
									))}
								</ul>
							</div>

							{/* FAQ */}
							{service.faq.length > 0 && (
								<div>
									<h2 className={s.cardTitle} style={{ marginBottom: '16px' }}>
										Частые вопросы
									</h2>
									<div className={s.faqList}>
										{service.faq.map((item, i) => (
											<div key={i} className={s.faqItem}>
												<button className={s.faqBtn} onClick={() => setOpenFaq(openFaq === i ? null : i)} type='button'>
													<span className={s.faqQuestion}>{item.question}</span>
													<div className={`${s.faqIcon} ${openFaq === i ? s.open : ''}`}>
														<Plus size={13} />
													</div>
												</button>
												<div className={`${s.faqBody} ${openFaq === i ? s.open : ''}`}>
													<div className={s.faqBodyInner}>
														<p className={s.faqAnswer}>{item.answer}</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Sidebar */}
						<aside className={s.sidebar}>
							{/* CTA card */}
							<div className={s.sidebarCard}>
								<h3 className={s.sidebarTitle}>Нужна помощь?</h3>
								<p className={s.sidebarDesc}>
									Оставьте заявку — перезвоним в течение 15 минут и договоримся об удобном времени.
								</p>
								<div className={s.sidebarBtns}>
									<Button variant='cta' data-popup='open' icon={<Phone size={15} />}>
										Оставить заявку
									</Button>
									<a href={`tel:${CONTACTS.phoneRaw}`} className={s.sidebarPhoneLink}>
										{CONTACTS.phone}
									</a>
								</div>
							</div>

							{/* Prices — mobile */}
							<div className={s.sidebarCard}>
								<h3 className={s.sidebarTitle}>Стоимость</h3>
								<div className={s.sidebarPrices}>
									{service.prices.map((p, i) => (
										<div key={i} className={s.sidebarPriceItem}>
											<span className={s.sidebarPriceLabel}>{p.label}</span>
											<span className={s.sidebarPriceVal}>{formatPrice(p.from, p.to)}</span>
										</div>
									))}
								</div>
							</div>

							<Link
								href='/uslugi/'
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: '6px',
									fontSize: '13px',
									fontWeight: 600,
									color: 'var(--color-muted)',
									textDecoration: 'none',
									padding: '0 4px'
								}}
							>
								<ArrowLeft size={14} />
								Все услуги
							</Link>
						</aside>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className={s.cta}>
				<div className={s.ctaBg} aria-hidden />
				<div className={s.ctaInner}>
					<div className={s.ctaLeft}>
						<h2 className={s.ctaTitle}>
							Готовы <em>помочь</em> прямо сейчас
						</h2>
						<p className={s.ctaDesc}>Выезд в удобное для вас время — домой или в офис.</p>
					</div>
					<div className={s.ctaBtns}>
						<Button variant='cta' data-popup='open' icon={<Phone size={15} />}>
							Вызвать мастера
						</Button>
						<a href={`tel:${CONTACTS.phoneRaw}`} className={s.btnOutline}>
							{CONTACTS.phone}
						</a>
					</div>
				</div>
			</section>
		</main>
	)
}
