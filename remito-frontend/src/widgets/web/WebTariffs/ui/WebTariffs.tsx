import { WEB_BASE_PATH, WEB_TARIFFS } from '@/entities/web-service'
import { Button } from '@/shared/ui/Button'
import { WebSection, WebSectionHead } from '@/widgets/web/WebSection'
import { Check } from 'lucide-react'
import Link from 'next/link'
import s from './WebTariffs.module.scss'

export function WebTariffs() {
	return (
		<WebSection tone='gray' id='tarify'>
			<WebSectionHead
				tag='Тарифы'
				title={
					<>
						Пакеты <span>под задачу</span>
					</>
				}
				desc='Ориентировочные цены — точную смету согласуем после брифа.'
			/>

			<div className={s.grid}>
				{WEB_TARIFFS.map(tariff => (
					<div key={tariff.id} className={`${s.card} ${tariff.featured ? s.cardFeatured : ''}`}>
						{tariff.featured && <span className={s.badge}>Популярный</span>}
						<h3 className={s.name}>{tariff.name}</h3>
						<p className={s.desc}>{tariff.description}</p>
						<div className={s.price}>
							<span className={s.priceLabel}>от</span>
							<span className={s.priceVal}>{tariff.priceFrom.toLocaleString('ru')} ₽</span>
						</div>
						<div className={s.meta}>
							<span>{tariff.pages}</span>
							<span>·</span>
							<span>{tariff.days}</span>
						</div>
						<ul className={s.features}>
							{tariff.features.map(feature => (
								<li key={feature}>
									<Check size={16} />
									{feature}
								</li>
							))}
						</ul>
						<Button variant={tariff.featured ? 'primary' : 'ghost'} data-popup='open' className={s.btn}>
							Обсудить тариф
						</Button>
					</div>
				))}
			</div>

			<p className={s.note}>
				Подробное сравнение — на странице{' '}
				<Link href={`${WEB_BASE_PATH}/ceny/`}>тарифов и цен</Link>
			</p>
		</WebSection>
	)
}
