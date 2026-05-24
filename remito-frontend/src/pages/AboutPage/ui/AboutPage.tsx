import { Button } from '@/shared/ui/Button'
import { IconMail, IconMapPin, IconPhone } from '@/shared/ui/Icons'
import Link from 'next/link'
import { ABOUT_STATS, ABOUT_VALUES } from '../model/about.data'
import s from './AboutPage.module.scss'

const TIMELINE = [
	{ year: '2016', text: 'Основали Remito — начинали с ремонта принтеров для частных клиентов.' },
	{ year: '2018', text: 'Расширили список услуг: добавили ремонт ноутбуков и заправку картриджей.' },
	{ year: '2020', text: 'Запустили выездной сервис по всему Екатеринбургу — без выходных.' },
	{ year: '2022', text: 'Перешли на официальные запчасти OEM/ORI, ввели гарантию 90 дней.' },
	{ year: '2024', text: 'Открыли направление веб-разработки для малого бизнеса.' }
]

export function AboutPage() {
	return (
		<main className={s.page}>
			{/* ===================== HERO ===================== */}
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow1} />
					<div className={s.heroBgGlow2} />
				</div>

				<div className={s.heroInner}>
					<div className={s.heroLeft}>
						<span className={s.heroTag}>О компании</span>
						<h1 className={s.heroTitle}>
							Remito — сервис,
							<br />
							которому <span>можно доверять</span>
						</h1>
						<p className={s.heroDesc}>
							С 2016 года помогаем жителям и организациям Екатеринбурга решать проблемы с оргтехникой. Работаем честно,
							берём ответственность за результат и не исчезаем после оплаты.
						</p>
						<div className={s.heroContacts}>
							<div className={s.heroContact}>
								<IconPhone size={15} />
								<a href='tel:+73431234567'>+7 (343) 123-45-67</a>
							</div>
							<div className={s.heroContact}>
								<IconMail />
								<a href='mailto:info@remito.ru'>info@remito.ru</a>
							</div>
							<div className={s.heroContact}>
								<IconMapPin />
								Екатеринбург, ул. Ленина, 1
							</div>
						</div>
					</div>

					<div className={s.heroCard}>
						{ABOUT_STATS.map(stat => (
							<div key={stat.label} className={s.heroStat}>
								<span className={s.heroStatNum}>{stat.num}</span>
								<span className={s.heroStatLabel}>{stat.label}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ===================== STORY ===================== */}
			<section className={s.story}>
				<div className={s.container}>
					<div className={s.storyInner}>
						<div className={s.storyLeft}>
							<span className={s.sectionTag}>Наша история</span>
							<h2 className={s.sectionTitle}>
								Как мы <span>начинали</span>
							</h2>
							<div className={s.storyText}>
								<p>
									Remito появился в <strong>2016 году</strong> — из желания делать ремонт техники так, как хотелось бы
									самому: без обмана, без лишнего ожидания и с реальной ответственностью за работу.
								</p>
								<p>
									Начинали с небольшого потока клиентов и принтеров Canon и HP. Постепенно освоили МФУ, ноутбуки,
									компьютеры — и сформировали устойчивую базу постоянных клиентов, которые возвращаются снова.
								</p>
								<p>
									Сегодня мы работаем по всему Екатеринбургу, выезжаем в день обращения и стараемся решить проблему с
									первого раза. Если что-то пошло не так — возвращаемся и исправляем. Без лишних слов.
								</p>
							</div>
						</div>

						<div className={s.storyRight}>
							<div className={s.timeline}>
								{TIMELINE.map(item => (
									<div key={item.year} className={s.timelineItem}>
										<div className={s.timelineDot}>
											<div className={s.timelineDotInner} />
											<div className={s.timelineLine} />
										</div>
										<div className={s.timelineContent}>
											<span className={s.timelineYear}>{item.year}</span>
											<span className={s.timelineText}>{item.text}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ===================== VALUES ===================== */}
			<section className={s.values}>
				<div className={s.container}>
					<div className={s.valuesHead}>
						<span className={s.sectionTag}>Наши принципы</span>
						<h2 className={s.sectionTitle}>
							Как мы <span>работаем</span>
						</h2>
						<p className={s.valuesDesc}>
							Не обещаем золотых гор — просто делаем свою работу хорошо и берём за неё ответственность.
						</p>
					</div>

					<div className={s.valuesGrid}>
						{ABOUT_VALUES.map(item => (
							<div key={item.title} className={s.valueCard}>
								<div className={s.valueCardDot} style={{ background: item.color }} />
								<h3 className={s.valueCardTitle}>{item.title}</h3>
								<p className={s.valueCardDesc}>{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ===================== CTA ===================== */}
			<section className={s.cta}>
				<div className={s.ctaBg} aria-hidden />
				<div className={s.ctaInner}>
					<div className={s.ctaLeft}>
						<h2 className={s.ctaTitle}>
							Есть вопрос или нужна <em>помощь?</em>
						</h2>
						<p className={s.ctaDesc}>Позвоните или оставьте заявку — разберёмся вместе. Без лишних слов.</p>
					</div>
					<div className={s.ctaBtns}>
						<Button variant='cta' data-popup='open' icon={<IconPhone size={15} />}>
							Вызвать мастера
						</Button>
						<Link href='/kontakty/' className={s.btnOutline}>
							Контакты →
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}
