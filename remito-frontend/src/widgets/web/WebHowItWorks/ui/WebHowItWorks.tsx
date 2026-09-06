import { WEB_STEPS } from '@/entities/web-service'
import { WebSection, WebSectionHead } from '@/widgets/web/WebSection'
import s from './WebHowItWorks.module.scss'

export function WebHowItWorks() {
	return (
		<WebSection tone='light' id='process'>
			<WebSectionHead
				tag='Процесс'
				title={
					<>
						Как мы <span>работаем</span>
					</>
				}
				desc='Прозрачные этапы — вы всегда знаете, на каком шаге проект и что будет дальше.'
			/>

			<div className={s.steps}>
				{WEB_STEPS.map(step => (
					<div key={step.step} className={s.step}>
						<div className={s.stepNum}>{step.step}</div>
						<div className={s.stepBody}>
							<div className={s.stepTop}>
								<h3 className={s.stepTitle}>{step.title}</h3>
								<span className={s.stepDuration}>{step.duration}</span>
							</div>
							<p className={s.stepDesc}>{step.description}</p>
						</div>
					</div>
				))}
			</div>
		</WebSection>
	)
}
