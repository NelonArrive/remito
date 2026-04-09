import { IconDock, IconLightning, IconShield } from '@/shared/ui/Icons'
import styles from './Advantages.module.scss'

export function Advantages() {
	return (
		<section className='advantages'>
			<div className='advantages__bg'>
				<div className='advantages__bg-grid'></div>
				<div className='advantages__bg-glow advantages__bg-glow--1'></div>
				<div className='advantages__bg-glow advantages__bg-glow--2'></div>
			</div>

			<div className='container'>
				<div className='advantages__head'>
					<div className='advantages__head-left'>
						<span className='section-tag'>Почему Remito</span>
						<h2 className='section-title'>
							Ремонт, которому
							<br />
							можно <span>доверять</span>
						</h2>
						<p className='section-desc'>
							Работаем честно, быстро и с гарантией. Вот почему нас выбирают снова и снова.
						</p>
					</div>
					<div className='advantages__head-right'>
						<span className='advantages__years'>8+</span>
						<span className='advantages__years-label'>лет на рынке Екатеринбурга</span>
					</div>
				</div>

				<div className='advantages__grid'>
					<div className={`${styles.advCard} ${styles.blue}`} />
					<div className='adv-card__icon'>
						<IconLightning />
					</div>
					<h3 className='adv-card__title'>Выезд за 1 час</h3>
					<p className='adv-card__desc'>Мастер приедет к вам в течение часа после звонка — по всему Екатеринбургу.</p>
					<span className='adv-card__num'>~60 мин</span>
				</div>

				<div className={`${styles.advCard} ${styles.green}`}>
					<div className='adv-card__icon'>
						<IconShield />
					</div>
					<h3 className='adv-card__title'>Гарантия 90 дней</h3>
					<p className='adv-card__desc'>
						Официальная гарантия на все виды работ. Если что-то пойдёт не так — устраним бесплатно.
					</p>
					<span className='adv-card__num'>90 дней</span>
				</div>

				<div className={`${styles.advCard} ${styles.orange}`}>
					<div className='adv-card__icon'>
						<svg
							width='22'
							height='22'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.8'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='12' y1='1' x2='12' y2='23' />
							<path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
						</svg>
					</div>
					<h3 className='adv-card__title'>Честные цены</h3>
					<p className='adv-card__desc'>Стоимость озвучиваем до начала работ. Никаких скрытых платежей и накруток.</p>
					<span className='adv-card__num'>0 скрытых</span>
				</div>

				<div className={`${styles.advCard} ${styles.purple}`}>
					<div className='adv-card__icon'>
						<IconDock />
					</div>
					<h3 className='adv-card__title'>Бесплатная диагностика</h3>
					<p className='adv-card__desc'>
						Полная диагностика неисправности — бесплатно. Вы сами решаете, делать ремонт или нет.
					</p>
					<span className='adv-card__num'>Бесплатно</span>
				</div>

				<div className={`${styles.advCard} ${styles.teal}`}>
					<div className='adv-card__icon'>
						<svg
							width='22'
							height='22'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.8'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<circle cx='12' cy='12' r='10' />
							<polyline points='12 6 12 12 16 14' />
						</svg>
					</div>
					<h3 className='adv-card__title'>Работаем 7 дней в неделю</h3>
					<p className='adv-card__desc'>Без выходных и праздников. Принимаем заявки с 9:00 до 21:00 каждый день.</p>
					<span className='adv-card__num'>Пн–Вс</span>
				</div>

				<div className={`${styles.advCard} ${styles.pink}`}>
					<div className='adv-card__icon'>
						<svg
							width='22'
							height='22'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.8'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
							<circle cx='9' cy='7' r='4' />
							<path d='M23 21v-2a4 4 0 0 0-3-3.87' />
							<path d='M16 3.13a4 4 0 0 1 0 7.75' />
						</svg>
					</div>
					<h3 className='adv-card__title'>Опытные мастера</h3>
					<p className='adv-card__desc'>
						Все специалисты сертифицированы и имеют опыт от 5 лет. Постоянное повышение квалификации.
					</p>
					<span className='adv-card__num'>5+ лет</span>
				</div>

				<div className={`${styles.advCard} ${styles.yellow}`}>
					<div className='adv-card__icon'>
						<svg
							width='22'
							height='22'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.8'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<polyline points='20 12 20 22 4 22 4 12' />
							<rect x='2' y='7' width='20' height='5' />
							<line x1='12' y1='22' x2='12' y2='7' />
							<path d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' />
							<path d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' />
						</svg>
					</div>
					<h3 className='adv-card__title'>Оригинальные запчасти</h3>
					<p className='adv-card__desc'>
						Используем только оригинальные или сертифицированные аналоговые запчасти от проверенных поставщиков.
					</p>
					<span className='adv-card__num'>OEM / ORI</span>
				</div>

				<div className={`${styles.advCard} ${styles.sky}`}>
					<div className='adv-card__icon'>
						<svg
							width='22'
							height='22'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.8'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
						</svg>
					</div>
					<h3 className='adv-card__title'>Консультация бесплатно</h3>
					<p className='adv-card__desc'>
						Позвоните или напишите — ответим на любые вопросы по ремонту и стоимости без обязательств.
					</p>
					<span className='adv-card__num'>Онлайн</span>
				</div>
			</div>

			<div className='advantages__stats'>
				<div className='adv-stat'>
					<span className='adv-stat__num' data-count='2000'>
						<em className='count-val'>2 000</em>
						<em>+</em>
					</span>
					<span className='adv-stat__label'>Отремонтировано устройств</span>
				</div>

				<div className='adv-stat'>
					<span className='adv-stat__num' data-count='98'>
						<em className='count-val'>98</em>
						<em className={styles.mutedPercent}>%</em>
					</span>
					<span className='adv-stat__label'>Клиентов довольны результатом</span>
				</div>

				<div className='adv-stat'>
					<span className='adv-stat__num' data-count='8'>
						<em className='count-val'>8</em>
						<em className={styles.mutedPercent}>лет</em>
					</span>
					<span className='adv-stat__label'>На рынке Екатеринбурга</span>
				</div>

				<div className='adv-stat'>
					<span className='adv-stat__num' data-count='500'>
						<em className='count-val'>500</em>
						<em>+</em>
					</span>
					<span className='adv-stat__label'>Моделей принтеров в базе</span>
				</div>
			</div>
		</section>
	)
}
