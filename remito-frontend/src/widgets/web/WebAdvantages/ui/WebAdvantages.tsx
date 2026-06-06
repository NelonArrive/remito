import { WEB_ADVANTAGES } from '@/entities/web-service'
import { WebSection, WebSectionHead } from '@/widgets/web/WebSection'
import { Code2, Headphones, Search, Smartphone, Zap } from 'lucide-react'
import type { ComponentType } from 'react'
import s from './WebAdvantages.module.scss'

const ICON_MAP: Record<string, ComponentType<{ size?: number }>> = {
	Code2,
	Zap,
	Search,
	Smartphone,
	Headphones
}

export function WebAdvantages() {
	return (
		<WebSection tone='dark' id='advantages'>
			<WebSectionHead
				tag='Почему мы'
				title={
					<>
						Remito Web — <span>не шаблон на коленке</span>
					</>
				}
				desc='Небольшая команда, современный стек и ответственность за то, что сдаём.'
			/>

			<div className={s.grid}>
				{WEB_ADVANTAGES.map(item => {
					const Icon = ICON_MAP[item.icon]

					return (
						<div key={item.title} className={s.card}>
							<div className={s.cardIcon}>{Icon && <Icon size={22} />}</div>
							<h3 className={s.cardTitle}>{item.title}</h3>
							<p className={s.cardDesc}>{item.description}</p>
						</div>
					)
				})}
			</div>
		</WebSection>
	)
}
