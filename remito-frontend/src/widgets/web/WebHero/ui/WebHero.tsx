import { WEB_BASE_PATH } from '@/entities/web-service'
import { Button } from '@/shared/ui/Button'
import { ArrowRight, Code2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import s from './WebHero.module.scss'

export function WebHero() {
	return (
		<section className={s.hero}>
			<div className={s.bg} aria-hidden>
				<div className={s.bgGrid} />
				<div className={s.bgGlow1} />
				<div className={s.bgGlow2} />
			</div>

			<div className={s.inner}>
				<div className={s.left}>
					<div className={s.badge}>
						<Sparkles size={14} />
						<span>Remito Web · разработка сайтов</span>
					</div>

					<h1 className={s.title}>
						Делаем сайты,
						<br />
						<span>которые работают</span>
					</h1>

					<p className={s.desc}>
						Лендинги, визитки, корпоративные сайты и интернет-магазины на Next.js. Быстро, с SEO и адаптивом — без
						лишней воды, с ответственностью за результат.
					</p>

					<div className={s.actions}>
						<Button variant='cta' data-popup='open' icon={<ArrowRight size={16} />}>
							Обсудить проект
						</Button>
						<Link href={`${WEB_BASE_PATH}/ceny/`} className={s.btnOutline}>
							Смотреть тарифы
						</Link>
					</div>

					<div className={s.tech}>
						<Code2 size={16} />
						<span>Next.js · TypeScript · SEO · 90+ Lighthouse</span>
					</div>
				</div>

				<div className={s.right} aria-hidden>
					<div className={s.mockup}>
						<div className={s.mockupBar}>
							<span />
							<span />
							<span />
						</div>
						<div className={s.mockupBody}>
							<div className={s.mockupLine} />
							<div className={s.mockupLine} />
							<div className={s.mockupLineShort} />
							<div className={s.mockupCards}>
								<div className={s.mockupCard} />
								<div className={s.mockupCard} />
								<div className={s.mockupCard} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
