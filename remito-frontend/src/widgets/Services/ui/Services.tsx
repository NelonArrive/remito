import { Button } from '@/shared/ui/Button'
import {
	IconArrowRight,
	IconCart,
	IconCartridge,
	IconLaptop,
	IconMonitor,
	IconPhone,
	IconPrinter
} from '@/shared/ui/Icons'
import Link from 'next/link'
import { SERVICES } from '../model/services.data'
import s from './Services.module.scss'

const ICONS: Record<string, React.ReactNode> = {
	printer: <IconPrinter size={28} />,
	cartridge: <IconCartridge size={24} />,
	laptop: <IconLaptop size={24} />,
	computer: <IconMonitor size={24} />,
	shop: <IconCart size={24} />
}

export function Services() {
	return (
		<section className={s.section}>
			<div className={s.container}>
				<div className={s.header}>
					<span className={s.tag}>Наши услуги</span>
					<h2 className={s.title}>
						Ремонтируем всю
						<br />
						оргтехнику — <span>от ноутбуков до МФУ</span>
					</h2>
					<p className={s.desc}>
						Профессиональный ремонт оргтехники с гарантией. Выезд в день обращения по Екатеринбургу.
					</p>
				</div>

				<div className={s.grid}>
					{SERVICES.map(item => (
						<div
							key={item.id}
							className={[s.card, item.featured ? s.cardFeatured : ''].filter(Boolean).join(' ')}
							style={{ '--card-color': item.color } as React.CSSProperties}
						>
							<div className={s.icon}>{ICONS[item.id]}</div>

							<div className={s.inner}>
								<div className={s.body}>
									<h3 className={s.cardTitle}>{item.title}</h3>
									<p className={s.cardDesc}>{item.description}</p>
									<ul className={s.list}>
										{item.list.map((text, i) => (
											<li key={i} className={s.listItem}>
												<span className={s.dot} />
												{text}
											</li>
										))}
									</ul>
								</div>

								<div className={s.footer}>
									<div className={s.price}>
										<span className={s.priceLabel}>от</span>
										<span className={s.priceVal}>{item.price}</span>
									</div>
									<Link href={item.href} className={s.link}>
										{item.linkLabel ?? 'Подробнее'}
										<IconArrowRight size={14} />
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className={s.cta}>
					<Button variant='primary' data-popup='open' icon={<IconPhone size={15} />}>
						Вызвать мастера бесплатно
					</Button>
					<Link href='/remont/' className='btn-ghost'>
						Все услуги и цены →
					</Link>
				</div>
			</div>
		</section>
	)
}
