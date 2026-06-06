import { WEB_SERVICES, WEB_TARIFFS } from '@/entities/web-service'
import { Button } from '@/shared/ui/Button'
import { WebCTA } from '@/widgets/web/WebCTA'
import { WebSection, WebSectionHead } from '@/widgets/web/WebSection'
import { Check } from 'lucide-react'
import Link from 'next/link'
import s from './WebCenyPage.module.scss'

export function WebCenyPage() {
	return (
		<main className={s.page}>
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>
				<div className={s.heroInner}>
					<nav className={s.breadcrumbs}>
						<Link href='/web/'>Remito Web</Link>
						<span>/</span>
						<span>Цены</span>
					</nav>
					<span className={s.heroTag}>Тарифы</span>
					<h1 className={s.heroTitle}>
						Цены на <span>разработку сайтов</span>
					</h1>
					<p className={s.heroDesc}>Ориентировочные пакеты — точную смету согласуем после брифа.</p>
				</div>
			</section>

			<WebSection tone='gray'>
				<div className={s.tariffs}>
					{WEB_TARIFFS.map(tariff => (
						<div key={tariff.id} className={`${s.tariffCard} ${tariff.featured ? s.tariffFeatured : ''}`}>
							{tariff.featured && <span className={s.tariffBadge}>Популярный</span>}
							<h2 className={s.tariffName}>{tariff.name}</h2>
							<p className={s.tariffDesc}>{tariff.description}</p>
							<div className={s.tariffPrice}>от {tariff.priceFrom.toLocaleString('ru')} ₽</div>
							<p className={s.tariffMeta}>
								{tariff.pages} · {tariff.days}
							</p>
							<ul className={s.tariffFeatures}>
								{tariff.features.map(f => (
									<li key={f}>
										<Check size={16} />
										{f}
									</li>
								))}
							</ul>
							<Button variant={tariff.featured ? 'primary' : 'ghost'} data-popup='open'>
								Обсудить
							</Button>
						</div>
					))}
				</div>
			</WebSection>

			<WebSection tone='light'>
				<WebSectionHead tag='По типу сайта' title={<>Услуги и <span>стартовые цены</span></>} align='left' />
				<div className={s.servicesTable}>
					{WEB_SERVICES.map(svc => (
						<Link key={svc.id} href={svc.href} className={s.serviceRow}>
							<span className={s.serviceName}>{svc.title}</span>
							<span className={s.serviceMeta}>{svc.pages}</span>
							<span className={s.servicePrice}>от {svc.priceFrom.toLocaleString('ru')} ₽</span>
						</Link>
					))}
				</div>
			</WebSection>

			<WebCTA />
		</main>
	)
}
