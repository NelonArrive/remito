'use client'

import type { WebServiceFaqItem } from '@/entities/web-service'
import { WebSection, WebSectionHead } from '@/widgets/web/WebSection'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import s from './WebServiceFAQ.module.scss'

interface WebServiceFAQProps {
	items: WebServiceFaqItem[]
}

export function WebServiceFAQ({ items }: WebServiceFAQProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(0)

	if (items.length === 0) return null

	return (
		<WebSection tone='gray' id='faq'>
			<WebSectionHead
				tag='FAQ'
				title={
					<>
						Вопросы <span>по услуге</span>
					</>
				}
				desc='Ответы про сроки, состав работ и детали запуска.'
				align='left'
			/>

			<div className={s.list}>
				{items.map((item, index) => {
					const isOpen = openIndex === index

					return (
						<div key={item.question} className={`${s.item} ${isOpen ? s.itemOpen : ''}`}>
							<button
								type='button'
								className={s.btn}
								onClick={() => setOpenIndex(isOpen ? null : index)}
								aria-expanded={isOpen}
							>
								<span className={s.question}>{item.question}</span>
								<span className={`${s.icon} ${isOpen ? s.iconOpen : ''}`}>
									<Plus size={14} />
								</span>
							</button>
							<div className={`${s.body} ${isOpen ? s.bodyOpen : ''}`}>
								<div className={s.bodyInner}>
									<p className={s.answer}>{item.answer}</p>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</WebSection>
	)
}
