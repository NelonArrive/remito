'use client'

import { IconPhone, IconPlus, IconTg } from '@/shared/ui/Icons'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FAQ_ITEMS, FAQ_TABS } from '../model/faq.data'
import type { FaqCategory } from '../model/faq.types'
import s from './FAQ.module.scss'

const CAT_CLASS: Record<string, string> = {
	repair: s.catRepair,
	price: s.catPrice,
	cart: s.catCart,
	guarant: s.catGuarant,
	work: s.catWork
}

export function FAQ() {
	const [activeTab, setActiveTab] = useState<FaqCategory>('all')
	const [openId, setOpenId] = useState<string | null>('1')

	const filtered = useMemo(
		() => (activeTab === 'all' ? FAQ_ITEMS : FAQ_ITEMS.filter(i => i.category === activeTab)),
		[activeTab]
	)

	const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id))

	return (
		<section className={s.section}>
			<div className={s.container}>
				<div className={s.inner}>
					<div className={s.left}>
						<div className={s.head}>
							<span className={s.tag}>FAQ</span>
							<h2 className={s.title}>
								Частые <span>вопросы</span>
							</h2>
							<p className={s.desc}>Отвечаем на самые популярные вопросы о ремонте, ценах и гарантии.</p>
							<div className={s.counter}>
								<span className={s.counterNum}>12</span>
								<span className={s.counterLabel}>вопросов и ответов</span>
							</div>
						</div>

						<div className={s.tags}>
							{FAQ_TABS.map(tab => (
								<button
									key={tab.id}
									className={`${s.tagBtn} ${activeTab === tab.id ? s.tagActive : ''}`}
									onClick={() => setActiveTab(tab.id)}
									type='button'
								>
									{tab.label}
								</button>
							))}
						</div>

						<div className={s.ask}>
							<h4 className={s.askTitle}>Не нашли ответ?</h4>
							<p className={s.askDesc}>Задайте вопрос напрямую — ответим в течение 15 минут</p>
							<div className={s.askBtns}>
								<Link href='tel:+73431234567' className={s.btnCall}>
									<IconPhone size={15} />
									Позвонить
								</Link>
								<Link href='https://t.me/remito' className={s.btnTg} target='_blank' rel='noopener'>
									<IconTg />
									Написать в Telegram
								</Link>
							</div>
						</div>
					</div>

					<div className={s.list}>
						{filtered.map(item => {
							const isOpen = openId === item.id
							return (
								<div key={item.id} className={`${s.item} ${isOpen ? s.itemOpen : ''}`}>
									<button className={s.itemBtn} onClick={() => toggle(item.id)} aria-expanded={isOpen} type='button'>
										<div className={s.itemLeft}>
											<span className={s.itemIndex}>{item.index}</span>
											<span className={s.itemQuestion}>
												{item.question}
												<span className={`${s.itemCat} ${CAT_CLASS[item.category]}`}>{item.catLabel}</span>
											</span>
										</div>
										<div className={s.itemIcon}>
											<IconPlus />
										</div>
									</button>

									<div className={s.itemBody}>
										<div className={s.itemBodyInner}>
											<div className={s.itemAnswer}>{item.answer}</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
