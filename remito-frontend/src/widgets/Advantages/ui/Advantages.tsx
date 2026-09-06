'use client'

import { IconDock, IconLightning, IconShield } from '@/shared/ui/Icons'
import { useEffect, useRef } from 'react'
import s from './Advantages.module.scss'

const IconMoney = () => (
	<svg
		width='22'
		height='22'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.8'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden
	>
		<line x1='12' y1='1' x2='12' y2='23' />
		<path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
	</svg>
)

const IconClock = () => (
	<svg
		width='22'
		height='22'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.8'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden
	>
		<circle cx='12' cy='12' r='10' />
		<polyline points='12 6 12 12 16 14' />
	</svg>
)

const IconTeam = () => (
	<svg
		width='22'
		height='22'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.8'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden
	>
		<path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
		<circle cx='9' cy='7' r='4' />
		<path d='M23 21v-2a4 4 0 0 0-3-3.87' />
		<path d='M16 3.13a4 4 0 0 1 0 7.75' />
	</svg>
)

const IconParts = () => (
	<svg
		width='22'
		height='22'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.8'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden
	>
		<polyline points='20 12 20 22 4 22 4 12' />
		<rect x='2' y='7' width='20' height='5' />
		<line x1='12' y1='22' x2='12' y2='7' />
		<path d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' />
		<path d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' />
	</svg>
)

const IconChat = () => (
	<svg
		width='22'
		height='22'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.8'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden
	>
		<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
	</svg>
)

function useCountUp(ref: React.RefObject<HTMLElement | null>, target: number) {
	useEffect(() => {
		const el = ref.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return
				observer.disconnect()

				let start = 0
				const duration = 1800
				const step = (timestamp: number, startTime: number) => {
					const progress = Math.min((timestamp - startTime) / duration, 1)
					const eased = 1 - Math.pow(1 - progress, 3)
					el.textContent = Math.floor(eased * target).toLocaleString('ru')
					if (progress < 1) requestAnimationFrame(t => step(t, startTime))
					else el.textContent = target.toLocaleString('ru')
				}
				requestAnimationFrame(t => step(t, t))
			},
			{ threshold: 0.3 }
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [ref, target])
}

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
	const ref = useRef<HTMLElement | null>(null)
	useCountUp(ref, target)
	return (
		<div className={s.stat}>
			<span className={s.statNum}>
				<em ref={ref as React.RefObject<HTMLElement>}>0</em>
				<em className={s.statSuffix}>{suffix}</em>
			</span>
			<span className={s.statLabel}>{label}</span>
		</div>
	)
}

export function Advantages() {
	return (
		<section className={s.section}>
			{/* BG */}
			<div className={s.bg} aria-hidden>
				<div className={s.bgGrid} />
				<div className={s.bgGlow1} />
				<div className={s.bgGlow2} />
			</div>

			<div className={s.container}>
				{/* Head */}
				<div className={s.head}>
					<div className={s.headLeft}>
						<span className={s.tag}>Почему Remito</span>
						<h2 className={s.title}>
							Ремонт, которому
							<br />
							можно <span>доверять</span>
						</h2>
						<p className={s.desc}>Работаем честно, быстро и с гарантией. Вот почему нас выбирают снова и снова.</p>
					</div>
					<div className={s.headRight}>
						<span className={s.years}>8+</span>
						<span className={s.yearsLabel}>лет на рынке</span>
					</div>
				</div>

				{/* Grid */}
				<div className={s.grid}>
					<div className={`${s.card} ${s.blue}`}>
						<div className={s.cardIcon}>
							<IconLightning size={22} />
						</div>
						<h3 className={s.cardTitle}>Выезд в удобное время</h3>
						<p className={s.cardDesc}>Мастер приедет домой или в офис — согласуем время, которое вам подходит.</p>
						<span className={s.cardNum}>Бесплатно</span>
					</div>

					<div className={`${s.card} ${s.green}`}>
						<div className={s.cardIcon}>
							<IconShield size={22} />
						</div>
						<h3 className={s.cardTitle}>Гарантия на работы</h3>
						<p className={s.cardDesc}>
							Ответственность за результат. Если что-то пойдёт не так — устраним бесплатно.
						</p>
						<span className={s.cardNum}>Официально</span>
					</div>

					<div className={`${s.card} ${s.orange}`}>
						<div className={s.cardIcon}>
							<IconMoney />
						</div>
						<h3 className={s.cardTitle}>Честные цены</h3>
						<p className={s.cardDesc}>Стоимость озвучиваем до начала работ. Никаких скрытых платежей и накруток.</p>
						<span className={s.cardNum}>0 скрытых</span>
					</div>

					<div className={`${s.card} ${s.purple}`}>
						<div className={s.cardIcon}>
							<IconDock size={22} />
						</div>
						<h3 className={s.cardTitle}>Бесплатная диагностика</h3>
						<p className={s.cardDesc}>
							Полная диагностика неисправности — бесплатно. Вы сами решаете, делать ремонт или нет.
						</p>
						<span className={s.cardNum}>Бесплатно</span>
					</div>

					<div className={`${s.card} ${s.teal}`}>
						<div className={s.cardIcon}>
							<IconClock />
						</div>
						<h3 className={s.cardTitle}>Работаем 7 дней в неделю</h3>
						<p className={s.cardDesc}>Без выходных и праздников. Принимаем заявки с 9:00 до 21:00 каждый день.</p>
						<span className={s.cardNum}>Пн–Вс</span>
					</div>

					<div className={`${s.card} ${s.pink}`}>
						<div className={s.cardIcon}>
							<IconTeam />
						</div>
						<h3 className={s.cardTitle}>Опытные мастера</h3>
						<p className={s.cardDesc}>
							Все специалисты сертифицированы и имеют опыт от 5 лет. Постоянное повышение квалификации.
						</p>
						<span className={s.cardNum}>5+ лет</span>
					</div>

					<div className={`${s.card} ${s.yellow}`}>
						<div className={s.cardIcon}>
							<IconParts />
						</div>
						<h3 className={s.cardTitle}>Оригинальные запчасти</h3>
						<p className={s.cardDesc}>
							Используем только оригинальные или сертифицированные аналоговые запчасти от проверенных поставщиков.
						</p>
						<span className={s.cardNum}>OEM / ORI</span>
					</div>

					<div className={`${s.card} ${s.sky}`}>
						<div className={s.cardIcon}>
							<IconChat />
						</div>
						<h3 className={s.cardTitle}>Консультация бесплатно</h3>
						<p className={s.cardDesc}>
							Позвоните или напишите — ответим на любые вопросы по ремонту и стоимости без обязательств.
						</p>
						<span className={s.cardNum}>Онлайн</span>
					</div>
				</div>

				{/* Stats */}
				<div className={s.stats}>
					<StatCounter target={2000} suffix='+' label='Отремонтировано устройств' />
					<StatCounter target={98} suffix='%' label='Клиентов довольны результатом' />
					<StatCounter target={8} suffix=' лет' label='На рынке' />
					<StatCounter target={500} suffix='+' label='Моделей принтеров в базе' />
				</div>
			</div>
		</section>
	)
}
