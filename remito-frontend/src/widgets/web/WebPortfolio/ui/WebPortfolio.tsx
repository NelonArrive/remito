import { WEB_PORTFOLIO_STUBS } from '@/entities/web-service'
import { WebSection, WebSectionHead } from '@/widgets/web/WebSection'
import { ImageIcon } from 'lucide-react'
import s from './WebPortfolio.module.scss'

export function WebPortfolio() {
	return (
		<WebSection tone='light' id='portfolio'>
			<WebSectionHead
				tag='Портфолио'
				title={
					<>
						Проекты <span>скоро здесь</span>
					</>
				}
				desc='Сейчас готовим кейсы — покажем реальные сайты после запуска.'
			/>

			<div className={s.grid}>
				{WEB_PORTFOLIO_STUBS.map(item => (
					<div key={item.id} className={s.card}>
						<div className={s.cardImg}>
							<ImageIcon size={32} />
							<span className={s.cardSoon}>Скоро</span>
						</div>
						<div className={s.cardBody}>
							<span className={s.cardCat}>{item.category}</span>
							<h3 className={s.cardTitle}>{item.title}</h3>
						</div>
					</div>
				))}
			</div>
		</WebSection>
	)
}
