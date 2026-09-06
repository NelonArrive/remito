import { CONTACTS } from '@/entities/legal'
import { ArrowRight, HelpCircle, Home, Phone, Search, Wrench } from 'lucide-react'
import Link from 'next/link'
import s from './not-found.module.scss'

export default function NotFound() {
	return (
		<main className={s.page}>
			<div className={s.bg} aria-hidden>
				<div className={s.bgGrid} />
				<div className={s.bgGlow1} />
				<div className={s.bgGlow2} />
			</div>

			<div className={s.content}>
				<div className={s.badge}>
					<HelpCircle size={16} />
					<span>Ошибка 404</span>
				</div>

				<div className={s.codeWrap}>
					<span className={s.code}>404</span>
					<div className={s.codeIcons} aria-hidden>
						<span className={s.codeIcon}>
							<Wrench size={16} />
						</span>
						<span className={s.codeIcon}>
							<Search size={16} />
						</span>
					</div>
				</div>

				<h1 className={s.title}>
					Страница <span>не найдена</span>
				</h1>

				<p className={s.desc}>
					Похоже, ссылка устарела или страница переехала. Ничего страшного — вернём вас на нужный раздел.
				</p>

				<div className={s.actions}>
					<Link href='/' className={s.btnPrimary}>
						<Home size={16} />
						На главную
						<ArrowRight size={16} />
					</Link>

					<Link href='/uslugi/' className={s.btnOutline}>
						<Wrench size={16} />К услугам
					</Link>
				</div>

				<div className={s.links}>
					<Link href='/ceny/' className={s.linkItem}>
						Цены
					</Link>
					<Link href='/kontakty/' className={s.linkItem}>
						Контакты
					</Link>
					<a href={`tel:${CONTACTS.phoneRaw}`} className={s.linkItem}>
						<Phone size={14} />
						{CONTACTS.phone}
					</a>
				</div>
			</div>
		</main>
	)
}
