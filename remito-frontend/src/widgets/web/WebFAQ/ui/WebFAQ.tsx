'use client'

import { WEB_FAQ } from '@/entities/web-service'
import { WebSection, WebSectionHead } from '@/widgets/web/WebSection'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import s from './WebFAQ.module.scss'

export function WebFAQ() {
	const [openId, setOpenId] = useState<string | null>(WEB_FAQ[0]?.id ?? null)

	return (
		<WebSection tone='gray' id='faq'>
			<WebSectionHead
				tag='FAQ'
				title={
					<>
						Частые <span>вопросы</span>
					</>
				}
				desc='Ответы про сроки, стоимость и процесс разработки.'
			/>

			<div className={s.list}>
				{WEB_FAQ.map(item => {
					const isOpen = openId === item.id

					return (
						<div key={item.id} className={`${s.item} ${isOpen ? s.itemOpen : ''}`}>
							<button
								type='button'
								className={s.btn}
								onClick={() => setOpenId(isOpen ? null : item.id)}
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
