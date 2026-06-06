import { WebAdvantages } from '@/widgets/web/WebAdvantages'
import { WebCTA } from '@/widgets/web/WebCTA'
import { WebFAQ } from '@/widgets/web/WebFAQ'
import { WebHero } from '@/widgets/web/WebHero'
import { WebHowItWorks } from '@/widgets/web/WebHowItWorks'
import { WebPortfolio } from '@/widgets/web/WebPortfolio'
import { WebServices } from '@/widgets/web/WebServices'
import { WebTariffs } from '@/widgets/web/WebTariffs'
import s from './WebHomePage.module.scss'

export function WebHomePage() {
	return (
		<main className={s.page}>
			<WebHero />
			<WebServices />
			<WebHowItWorks />
			<WebAdvantages />
			<WebTariffs />
			<WebPortfolio />
			<WebFAQ />
			<WebCTA />
		</main>
	)
}
