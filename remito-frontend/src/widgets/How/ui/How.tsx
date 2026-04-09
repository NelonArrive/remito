import { Button } from '@/shared/ui/Button'
import {
	IconArrowRight,
	IconChat,
	IconCheck,
	IconClock,
	IconHome,
	IconInfo,
	IconLightning,
	IconPhone,
	IconShield,
	IconTool
} from '@/shared/ui/Icons'
import Link from 'next/link'
import s from './How.module.scss'

export function How() {
	return (
		<section className={s.section}>
			<div className={s.bgLine} aria-hidden />

			<div className={s.container}>
				{/* Head */}
				<div className={s.head}>
					<div className={s.headLeft}>
						<span className={s.tag}>Как мы работаем</span>
						<h2 className={s.title}>
							Просто, быстро,
							<br />
							<span>без лишних слов</span>
						</h2>
						<p className={s.desc}>
							От звонка до готового устройства — всего 5 шагов. Большинство ремонтов занимает 1–2 часа прямо у вас.
						</p>
					</div>
					<Button variant='cta' data-popup='open' icon={<IconPhone size={15} />}>
						Вызвать мастера
					</Button>
				</div>

				{/* Steps */}
				<div className={s.steps}>
					<div className={s.step} style={{ '--step-color': '#3A86FF' } as React.CSSProperties}>
						<div className={s.circle}>
							<IconPhone size={26} />
							<span className={s.stepNum}>1</span>
						</div>
						<h3 className={s.stepTitle}>Вы звоните или оставляете заявку</h3>
						<p className={s.stepDesc}>Звоните по телефону, пишите в мессенджер или заполняете форму на сайте</p>
						<span className={s.stepTime}>
							<IconClock size={11} /> 2 минуты
						</span>
					</div>

					<div className={s.step} style={{ '--step-color': '#8B5CF6' } as React.CSSProperties}>
						<div className={s.circle}>
							<IconChat size={26} />
							<span className={s.stepNum}>2</span>
						</div>
						<h3 className={s.stepTitle}>Мы перезваниваем за 15 минут</h3>
						<p className={s.stepDesc}>Уточняем проблему и договариваемся об удобном времени выезда мастера</p>
						<span className={s.stepTime}>
							<IconClock size={11} /> 15 минут
						</span>
					</div>

					<div className={s.step} style={{ '--step-color': '#F97316' } as React.CSSProperties}>
						<div className={s.circle}>
							<IconInfo size={26} />
							<span className={s.stepNum}>3</span>
						</div>
						<h3 className={s.stepTitle}>Мастер приезжает и делает диагностику</h3>
						<p className={s.stepDesc}>Выезд в течение 1 часа. Бесплатная диагностика и озвучивание стоимости</p>
						<span className={s.stepTime}>
							<IconClock size={11} /> 1 час выезд
						</span>
					</div>

					<div className={s.step} style={{ '--step-color': '#22C55E' } as React.CSSProperties}>
						<div className={s.circle}>
							<IconTool size={26} />
							<span className={s.stepNum}>4</span>
						</div>
						<h3 className={s.stepTitle}>Ремонт с вашего согласия</h3>
						<p className={s.stepDesc}>
							Только после вашего подтверждения приступаем к работе. Большинство ремонтов — прямо у вас
						</p>
						<span className={s.stepTime}>
							<IconClock size={11} /> 1–3 часа
						</span>
					</div>

					<div className={s.step} style={{ '--step-color': '#FBBF24' } as React.CSSProperties}>
						<div className={s.circle}>
							<IconCheck size={26} />
							<span className={s.stepNum}>5</span>
						</div>
						<h3 className={s.stepTitle}>Готово — выдаём гарантию</h3>
						<p className={s.stepDesc}>
							Проверяем работу устройства вместе с вами и выдаём гарантийный талон на 90 дней
						</p>
						<span className={s.stepTime}>
							<IconShield size={11} /> Гарантия 90 дней
						</span>
					</div>
				</div>

				{/* Bottom cards */}
				<div className={s.bottom}>
					<div className={s.mode} style={{ '--step-color': '#3A86FF' } as React.CSSProperties}>
						<div className={s.modeHead}>
							<div className={s.modeIcon}>
								<IconLightning size={24} />
							</div>
							<div>
								<div className={s.modeTitle}>Выезд к вам</div>
								<div className={s.modeSub}>Домой или в офис — бесплатно</div>
							</div>
						</div>
						<ul className={s.modeList}>
							<li className={s.modeItem}>
								<span className={s.modeDot} />
								Мастер приедет в течение 1 часа после звонка
							</li>
							<li className={s.modeItem}>
								<span className={s.modeDot} />
								Ремонт производится прямо у вас — не нужно никуда везти
							</li>
							<li className={s.modeItem}>
								<span className={s.modeDot} />
								Работаем по всему Екатеринбургу, выезд бесплатный
							</li>
							<li className={s.modeItem}>
								<span className={s.modeDot} />
								Если нужна мастерская — заберём и привезём сами
							</li>
						</ul>
						<button className={s.modeCta} data-popup='open'>
							Вызвать мастера <IconArrowRight size={14} />
						</button>
					</div>

					<div className={s.mode} style={{ '--step-color': '#22C55E' } as React.CSSProperties}>
						<div className={s.modeHead}>
							<div className={s.modeIcon}>
								<IconHome size={24} />
							</div>
							<div>
								<div className={s.modeTitle}>Привезти в мастерскую</div>
								<div className={s.modeSub}>Екатеринбург, ул. Ленина, 1</div>
							</div>
						</div>
						<ul className={s.modeList}>
							<li className={s.modeItem}>
								<span className={s.modeDot} />
								Принимаем технику каждый день с 9:00 до 21:00
							</li>
							<li className={s.modeItem}>
								<span className={s.modeDot} />
								Диагностика при вас — сразу скажем что сломалось и сколько стоит
							</li>
							<li className={s.modeItem}>
								<span className={s.modeDot} />
								Простые ремонты делаем за 1–2 часа пока вы ждёте
							</li>
							<li className={s.modeItem}>
								<span className={s.modeDot} />
								Уведомим по SMS или в мессенджер когда готово
							</li>
						</ul>
						<Link href='/kontakty/' className={s.modeCta}>
							Адрес на карте <IconArrowRight size={14} />
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
