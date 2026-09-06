import { CONTACTS } from '@/entities/legal'
import { Button } from '@/shared/ui/Button'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import s from './WebCTA.module.scss'

export function WebCTA() {
	return (
		<section className={s.section} id='zayavka'>
			<div className={s.bg} aria-hidden>
				<div className={s.bgGrid} />
				<div className={s.bgGlow} />
			</div>

			<div className={s.inner}>
				<div className={s.left}>
					<span className={s.tag}>Начнём проект?</span>
					<h2 className={s.title}>
						Расскажите о задаче — <span>посчитаем сроки и бюджет</span>
					</h2>
					<p className={s.desc}>
						Ответим в течение рабочего дня. Без навязчивых продаж — только по делу: что нужно, сколько стоит, как
						запустим.
					</p>
					<div className={s.actions}>
						<Button variant='cta' data-popup='open' icon={<ArrowRight size={16} />}>
							Оставить заявку
						</Button>
						<a href={`tel:${CONTACTS.phoneRaw}`} className={s.phoneBtn}>
							<Phone size={16} />
							{CONTACTS.phone}
						</a>
					</div>
				</div>

				<div className={s.card}>
					<div className={s.cardIcon}>
						<MessageCircle size={22} />
					</div>
					<p className={s.cardTitle}>Бесплатная консультация</p>
					<p className={s.cardDesc}>
						15–20 минут созвона или переписки — разберём формат сайта и подскажем, с чего начать.
					</p>
					<ul className={s.cardList}>
						<li>Оценка сроков и бюджета</li>
						<li>Рекомендации по структуре</li>
						<li>Ответы на технические вопросы</li>
					</ul>
				</div>
			</div>
		</section>
	)
}
