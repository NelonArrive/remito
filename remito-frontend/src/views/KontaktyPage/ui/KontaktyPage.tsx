import { Button } from '@/shared/ui/Button'
import { Building2, Clock, MessageCircle, Phone, Send } from 'lucide-react'
import { CONTACTS, REQUISITES } from '../model/kontakty.data'
import s from './KontaktyPage.module.scss'

export function KontaktyPage() {
	return (
		<main className={s.page}>
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>
				<div className={s.heroInner}>
					<span className={s.heroTag}>Контакты</span>
					<h1 className={s.heroTitle}>
						Свяжитесь <span>с нами</span>
					</h1>
					<p className={s.heroDesc}>Позвоните или напишите — поможем разобраться с любым вопросом.</p>
				</div>
			</section>

			<section className={s.main}>
				<div className={s.container}>
					<div className={s.grid}>
						<div className={s.card}>
							<div className={s.cardTitle}>
								<div className={s.cardTitleIcon}>
									<Phone size={18} />
								</div>
								Телефон
							</div>
							<div className={s.contactList}>
								<div className={s.contactRow}>
									<span className={s.contactLabel}>Основной номер</span>
									<a href={`tel:${CONTACTS.phoneRaw}`} className={s.contactValLarge}>
										{CONTACTS.phone}
									</a>
								</div>
								<div className={s.hours}>
									<span className={s.hoursDot} />
									{CONTACTS.hours}
								</div>
								<p className={s.hoursNote}>
									Принимаем звонки без выходных. Если не отвечаем — перезвоним в течение 15 минут.
								</p>
							</div>
						</div>

						<div className={s.card}>
							<div className={s.cardTitle}>
								<div className={s.cardTitleIcon}>
									<MessageCircle size={18} />
								</div>
								Написать нам
							</div>
							<div className={s.contactList}>
								<div className={s.contactRow}>
									<span className={s.contactLabel}>Email</span>
									<a href={`mailto:${CONTACTS.email}`} className={s.contactVal}>
										{CONTACTS.email}
									</a>
								</div>
							</div>
							<div className={s.socials}>
								<a
									href={CONTACTS.telegram}
									target='_blank'
									rel='noopener noreferrer'
									className={`${s.socialBtn} ${s.socialBtnTg}`}
								>
									<Send size={15} /> Telegram
								</a>
								<a
									href={CONTACTS.whatsapp}
									target='_blank'
									rel='noopener noreferrer'
									className={`${s.socialBtn} ${s.socialBtnWa}`}
								>
									<MessageCircle size={15} /> WhatsApp
								</a>
								<a
									href={CONTACTS.vk}
									target='_blank'
									rel='noopener noreferrer'
									className={`${s.socialBtn} ${s.socialBtnVk}`}
								>
									<MessageCircle size={15} /> ВКонтакте
								</a>
								<a
									href={CONTACTS.gis2}
									target='_blank'
									rel='noopener noreferrer'
									className={`${s.socialBtn} ${s.socialBtnGis}`}
								>
									<MessageCircle size={15} /> 2GIS
								</a>
							</div>
						</div>

						<div className={s.card}>
							<div className={s.cardTitle}>
								<div className={s.cardTitleIcon}>
									<Clock size={18} />
								</div>
								Время работы
							</div>
							<div className={s.contactList}>
								<div className={s.contactRow}>
									<span className={s.contactLabel}>Звонки и заявки</span>
									<span className={s.contactVal}>Ежедневно, 9:00 — 21:00</span>
								</div>
								<div className={s.contactRow}>
									<span className={s.contactLabel}>Выезд мастера</span>
									<span className={s.contactVal}>Ежедневно, 9:00 — 20:00</span>
								</div>
								<p className={s.hoursNote}>В праздничные дни режим работы может меняться — уточняйте по телефону.</p>
							</div>
						</div>

						<div className={`${s.card} ${s.cardFull}`}>
							<div className={s.cardTitle}>
								<div className={s.cardTitleIcon}>
									<Building2 size={18} />
								</div>
								Реквизиты
							</div>
							<div className={s.reqGrid}>
								<div className={s.reqItem}>
									<span className={s.reqLabel}>Наименование</span>
									<span className={s.reqVal}>{REQUISITES.name}</span>
								</div>
								<div className={s.reqItem}>
									<span className={s.reqLabel}>ИНН</span>
									<span className={s.reqVal}>{REQUISITES.inn}</span>
								</div>
								<div className={s.reqItem}>
									<span className={s.reqLabel}>ОГРНИП</span>
									<span className={s.reqVal}>{REQUISITES.ogrnip}</span>
								</div>
								<div className={s.reqItem}>
									<span className={s.reqLabel}>Расчётный счёт</span>
									<span className={s.reqVal}>{REQUISITES.account}</span>
								</div>
								<div className={s.reqItem}>
									<span className={s.reqLabel}>Банк</span>
									<span className={s.reqVal}>{REQUISITES.bankName}</span>
								</div>
								<div className={s.reqItem}>
									<span className={s.reqLabel}>ИНН банка</span>
									<span className={s.reqVal}>{REQUISITES.bankInn}</span>
								</div>
								<div className={s.reqItem}>
									<span className={s.reqLabel}>Корр. счёт</span>
									<span className={s.reqVal}>{REQUISITES.bankCorr}</span>
								</div>
								<div className={s.reqNote}>
									<span className={s.reqLabel}>Юридический адрес банка</span>
									<span className={s.reqVal}>{REQUISITES.bankAddress}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className={s.cta}>
				<div className={s.ctaInner}>
					<div className={s.ctaLeft}>
						<h2 className={s.ctaTitle}>Готовы помочь прямо сейчас</h2>
						<p className={s.ctaDesc}>Оставьте заявку — свяжемся в течение 15 минут.</p>
					</div>
					<div className={s.ctaBtns}>
						<Button variant='cta' data-popup='open' icon={<Phone size={15} />}>
							Оставить заявку
						</Button>
						<a href={`tel:${CONTACTS.phoneRaw}`}>
							<Button variant='ghost'>{CONTACTS.phone}</Button>
						</a>
					</div>
				</div>
			</section>
		</main>
	)
}
