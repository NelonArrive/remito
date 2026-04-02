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
} from '@/shared/ui/icons'

export function How() {
	return (
		<section className='how'>
			{/* <!-- Декор-линия --> */}
			<div className='how__bg-line'></div>

			<div className='container'>
				{/* <!-- Шапка --> */}
				<div className='how__head'>
					<div className='how__head-left'>
						<span className='section-tag'>Как мы работаем</span>
						<h2 className='section-title'>
							Просто, быстро,
							<br />
							<span>без лишних слов</span>
						</h2>
						<p className='section-desc'>
							От звонка до готового устройства — всего 5 шагов. Большинство ремонтов занимает 1–2 часа прямо у вас.
						</p>
					</div>
					<button data-popup='open' className='btn-cta'>
						<IconPhone />
						Вызвать мастера
					</button>
				</div>

				{/* <!-- 5 шагов --> */}
				<div className='how__steps'>
					{/* <!-- 1 --> */}
					<div className='how-step' style={{ '--step-color': '#3A86FF' } as React.CSSProperties}>
						<div className='how-step__circle'>
							<IconPhone />
							<span className='how-step__num'>1</span>
						</div>
						<h3 className='how-step__title'>Вы звоните или оставляете заявку</h3>
						<p className='how-step__desc'>Звоните по телефону, пишите в мессенджер или заполняете форму на сайте</p>
						<span className='how-step__time'>
							<IconClock /> 2 минуты
						</span>
					</div>

					{/* <!-- 2 --> */}
					<div className='how-step' style={{ '--step-color': '#8B5CF6' } as React.CSSProperties}>
						<div className='how-step__circle'>
							<IconChat />
							<span className='how-step__num'>2</span>
						</div>
						<h3 className='how-step__title'>Мы перезваниваем за 15 минут</h3>
						<p className='how-step__desc'>Уточняем проблему и договариваемся об удобном времени выезда мастера</p>
						<span className='how-step__time'>
							<IconClock />
							15 минут
						</span>
					</div>

					{/* <!-- 3 --> */}
					<div className='how-step' style={{ '--step-color': '#F97316' } as React.CSSProperties}>
						<div className='how-step__circle'>
							<IconInfo />
							<span className='how-step__num'>3</span>
						</div>
						<h3 className='how-step__title'>Мастер приезжает и делает диагностику</h3>
						<p className='how-step__desc'>Выезд в течение 1 часа. Бесплатная диагностика и озвучивание стоимости</p>
						<span className='how-step__time'>
							<IconClock /> 1 час выезд
						</span>
					</div>

					{/* <!-- 4 --> */}
					<div className='how-step' style={{ '--step-color': '#22C55E' } as React.CSSProperties}>
						<div className='how-step__circle'>
							<IconTool />
							<span className='how-step__num'>4</span>
						</div>
						<h3 className='how-step__title'>Ремонт с вашего согласия</h3>
						<p className='how-step__desc'>
							Только после вашего подтверждения приступаем к работе. Большинство ремонтов — прямо у вас
						</p>
						<span className='how-step__time'>
							<IconClock />
							1–3 часа
						</span>
					</div>

					{/* <!-- 5 --> */}
					<div className='how-step' style={{ '--step-color': '#FBBF24' } as React.CSSProperties}>
						<div className='how-step__circle'>
							<IconCheck />
							<span className='how-step__num'>5</span>
						</div>
						<h3 className='how-step__title'>Готово — выдаём гарантию</h3>
						<p className='how-step__desc'>
							Проверяем работу устройства вместе с вами и выдаём гарантийный талон на 90 дней
						</p>
						<span className='how-step__time'>
							<IconShield />
							Гарантия 90 дней
						</span>
					</div>
				</div>

				{/* <!-- Нижние 2 карточки: выезд vs самовывоз --> */}
				<div className='how__bottom'>
					{/* <!-- Выезд на дом/в офис --> */}
					<div className='how-mode' style={{ '--step-color': '#3A86FF' } as React.CSSProperties}>
						<div className='how-mode__head'>
							<div className='how-mode__icon'>
								<IconLightning />
							</div>
							<div>
								<div className='how-mode__title'>Выезд к вам</div>
								<div className='how-mode__sub'>Домой или в офис — бесплатно</div>
							</div>
						</div>
						<div className='how-mode__list'>
							<div className='how-mode__item'>
								<span className='how-mode__item-dot'></span>
								Мастер приедет в течение 1 часа после звонка
							</div>
							<div className='how-mode__item'>
								<span className='how-mode__item-dot'></span>
								Ремонт производится прямо у вас — не нужно никуда везти
							</div>
							<div className='how-mode__item'>
								<span className='how-mode__item-dot'></span>
								Работаем по всему Екатеринбургу, выезд бесплатный
							</div>
							<div className='how-mode__item'>
								<span className='how-mode__item-dot'></span>
								Если нужна мастерская — заберём и привезём сами
							</div>
						</div>
						<button data-popup='open' className='how-mode__cta'>
							Вызвать мастера
							<IconArrowRight />
						</button>
					</div>

					{/* <!-- Самовывоз / мастерская --> */}
					<div className='how-mode' style={{ '--step-color': '#22C55E' } as React.CSSProperties}>
						<div className='how-mode__head'>
							<div className='how-mode__icon'>
								<IconHome />
							</div>
							<div>
								<div className='how-mode__title'>Привезти в мастерскую</div>
								<div className='how-mode__sub'>Екатеринбург, ул. Ленина, 1</div>
							</div>
						</div>
						<div className='how-mode__list'>
							<div className='how-mode__item'>
								<span className='how-mode__item-dot'></span>
								Принимаем технику каждый день с 9:00 до 21:00
							</div>
							<div className='how-mode__item'>
								<span className='how-mode__item-dot'></span>
								Диагностика при вас — сразу скажем что сломалось и сколько стоит
							</div>
							<div className='how-mode__item'>
								<span className='how-mode__item-dot'></span>
								Простые ремонты делаем за 1–2 часа пока вы ждёте
							</div>
							<div className='how-mode__item'>
								<span className='how-mode__item-dot'></span>
								Уведомим по SMS или в мессенджер когда готово
							</div>
						</div>
						<a href='/kontakty' className='how-mode__cta'>
							Адрес на карте
							<IconArrowRight />
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
