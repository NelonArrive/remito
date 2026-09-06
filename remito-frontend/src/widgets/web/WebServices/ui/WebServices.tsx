import { WEB_SERVICES } from '@/entities/web-service'
import { WebSection, WebSectionHead } from '@/widgets/web/WebSection'
import { ArrowRight, Building2, Globe, Layout, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import type { ComponentType } from 'react'
import s from './WebServices.module.scss'

const ICON_MAP: Record<string, ComponentType<{ size?: number }>> = {
	Layout,
	Globe,
	Building2,
	ShoppingCart
}

export function WebServices() {
	return (
		<WebSection tone='gray' id='uslugi'>
			<WebSectionHead
				tag='Услуги'
				title={
					<>
						Какой сайт <span>вам нужен</span>
					</>
				}
				desc='Выберите формат — на каждой странице подробно расскажем, что входит и сколько стоит.'
			/>

			<div className={s.grid}>
				{WEB_SERVICES.map(service => {
					const Icon = ICON_MAP[service.icon]

					return (
						<Link
							key={service.id}
							href={service.href}
							className={s.card}
							style={
								{
									'--service-color': service.color,
									'--service-color-light': service.colorLight
								} as React.CSSProperties
							}
						>
							<div className={s.cardIcon}>{Icon && <Icon size={24} />}</div>
							<h3 className={s.cardTitle}>{service.title}</h3>
							<p className={s.cardDesc}>{service.previewText}</p>
							<div className={s.cardMeta}>
								<span className={s.cardPrice}>от {service.priceFrom.toLocaleString('ru')} ₽</span>
								<span className={s.cardDays}>{service.days}</span>
							</div>
							<span className={s.cardLink}>
								Подробнее
								<ArrowRight size={14} />
							</span>
						</Link>
					)
				})}
			</div>
		</WebSection>
	)
}
