import { LEGAL } from '@/entities/legal'
import { LegalDocumentPage, LegalList, LegalP, LegalSection } from './LegalDocumentPage'

export function TermsPage() {
	return (
		<LegalDocumentPage
			type='terms'
			title='Условия использования сайта'
			subtitle='Правила пользования материалами и сервисами remito.рф'
		>
			<LegalSection title='1. Общие положения'>
				<LegalP>
					Используя Сайт {LEGAL.siteUrl}, вы соглашаетесь с настоящими Условиями. Если вы не согласны — пожалуйста,
					не используйте Сайт.
				</LegalP>
			</LegalSection>

			<LegalSection title='2. Информация на сайте'>
				<LegalP>
					Материалы Сайта (тексты, цены, описания услуг) носят справочный характер. Окончательные условия
					определяются при согласовании заявки и диагностике.
				</LegalP>
			</LegalSection>

			<LegalSection title='3. Ограничения'>
				<LegalList
					items={[
						'запрещено нарушать работоспособность Сайта;',
						'запрещено копировать материалы без согласия правообладателя, кроме случаев, предусмотренных законом;',
						'запрещено использовать Сайт для незаконных целей.'
					]}
				/>
			</LegalSection>

			<LegalSection title='4. Интеллектуальная собственность'>
				<LegalP>
					Дизайн, тексты, логотипы и иные материалы Сайта защищены законодательством об интеллектуальной
					собственности и принадлежат {LEGAL.siteName} или правообладателям.
				</LegalP>
			</LegalSection>

			<LegalSection title='5. Ссылки на сторонние ресурсы'>
				<LegalP>
					Сайт может содержать ссылки на сторонние сервисы (мессенджеры, карты, аналитика). Исполнитель не несёт
					ответственность за их содержание и политику конфиденциальности.
				</LegalP>
			</LegalSection>

			<LegalSection title='6. Изменение условий'>
				<LegalP>
					Исполнитель вправе изменять Условия без предварительного уведомления. Актуальная версия публикуется на
					Сайте с указанием даты обновления: {LEGAL.updatedAt}.
				</LegalP>
			</LegalSection>

			<LegalSection title='7. Применимое право'>
				<LegalP>К отношениям применяется право Российской Федерации.</LegalP>
				<LegalP>
					По вопросам работы Сайта: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
				</LegalP>
			</LegalSection>
		</LegalDocumentPage>
	)
}
