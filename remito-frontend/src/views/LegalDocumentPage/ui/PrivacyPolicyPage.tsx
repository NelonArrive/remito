import { LEGAL } from '@/entities/legal'
import {
	LegalDocumentPage,
	LegalList,
	LegalP,
	LegalRequisitesBlock,
	LegalSection
} from './LegalDocumentPage'

export function PrivacyPolicyPage() {
	return (
		<LegalDocumentPage
			type='privacy'
			title='Политика конфиденциальности'
			subtitle='Как мы обрабатываем персональные данные на сайте и при обращении за услугами'
		>
			<LegalSection title='1. Общие положения'>
				<LegalP>
					Настоящая Политика определяет порядок обработки и защиты персональных данных пользователей сайта{' '}
					{LEGAL.siteUrl} (далее — Сайт), а также лиц, обращающихся за услугами {LEGAL.siteName}.
				</LegalP>
				<LegalP>
					Оператор персональных данных: {LEGAL.operatorName} (ИНН {LEGAL.inn}, ОГРНИП {LEGAL.ogrnip}). Регион
					оказания услуг: {LEGAL.operatorAddress}.
				</LegalP>
			</LegalSection>

			<LegalSection title='2. Какие данные мы собираем'>
				<LegalList
					items={[
						'имя (если указано в форме);',
						'номер телефона;',
						'адрес электронной почты;',
						'текст обращения / выбранная услуга;',
						'технические данные: IP-адрес, cookie, сведения о браузере и устройстве;',
						'данные, передаваемые сервисами веб-аналитики (Яндекс.Метрика, Google Analytics).'
					]}
				/>
			</LegalSection>

			<LegalSection title='3. Цели обработки'>
				<LegalList
					items={[
						'обработка заявок и обратной связи;',
						'согласование и оказание услуг;',
						'улучшение работы Сайта и аналитика;',
						'исполнение требований законодательства РФ.'
					]}
				/>
			</LegalSection>

			<LegalSection title='4. Cookie и аналитика'>
				<LegalP>
					На Сайте используются cookie и аналогичные технологии. При первом посещении показывается баннер согласия
					на использование cookie. Продолжая пользоваться Сайтом после принятия cookie, вы соглашаетесь с их
					использованием в соответствии с настоящей Политикой.
				</LegalP>
				<LegalP>
					Мы используем: {LEGAL.analytics.join(', ')}. Эти сервисы могут собирать обезличенную статистику
					посещений.
				</LegalP>
			</LegalSection>

			<LegalSection title='5. Передача третьим лицам'>
				<LegalP>
					Данные могут передаваться подрядчикам (хостинг, аналитика, сервисы связи) только в объёме, необходимом
					для целей обработки. Мы не продаём персональные данные.
				</LegalP>
			</LegalSection>

			<LegalSection title='6. Срок хранения и безопасность'>
				<LegalP>
					Данные хранятся не дольше, чем это необходимо для целей обработки, либо в сроки, установленные законом.
					Оператор принимает разумные организационные и технические меры защиты данных.
				</LegalP>
			</LegalSection>

			<LegalSection title='7. Ваши права'>
				<LegalP>
					Вы вправе запросить уточнение, блокирование или удаление данных, отозвать согласие (если применимо) и
					получить информацию об обработке.
				</LegalP>
				<LegalP>
					Запросы по персональным данным направляйте на email:{' '}
					<a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
				</LegalP>
			</LegalSection>

			<LegalSection title='8. Реквизиты оператора'>
				<LegalRequisitesBlock />
			</LegalSection>
		</LegalDocumentPage>
	)
}
