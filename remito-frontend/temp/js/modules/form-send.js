/* =============================================
	 form-send.js  →  src/js/modules/form-send.js
	 ============================================= */

const TELEGRAM_TOKEN = '8528069016:AAFHGKqd99J4RAnscVoBU0R-CTLuvdZte8I'
const TELEGRAM_CHAT_ID = '8258223025'

export default function initFormSend(showThankYou) {

	document.querySelectorAll('form').forEach(form => {
		form.addEventListener('submit', async e => {
			e.preventDefault()

			/* ---- Поля ---- */
			const nameField = form.querySelector('[name="name"]')
			const phoneField = form.querySelector('[name="phone"]')
			// question или comment — что найдёт первым
			const questionField = form.querySelector('[name="question"]')
				?? form.querySelector('[name="comment"]')
			// agreement или consent
			const consentField = form.querySelector('[name="agreement"]')
				?? form.querySelector('[name="consent"]')
			const submitBtn = form.querySelector('[type="submit"]')

			/* ---- Валидация ---- */
			const phone = phoneField?.value.trim() ?? ''
			if (!phone) {
				phoneField?.closest('.popup__form-group, .form-group')
					?.classList.add('has-error')
				return
			}

			if (consentField && !consentField.checked) {
				alert('Пожалуйста, дайте согласие на обработку данных.')
				return
			}

			/* ---- Кнопка: loading ---- */
			if (submitBtn) {
				submitBtn.disabled = true
				submitBtn.classList.add('is-loading')
			}

			/* ---- Сборка сообщения ---- */
			const name = nameField?.value.trim() || '—'
			const question = questionField?.value.trim() || '—'
			const time = new Date().toLocaleString('ru-RU', {
				timeZone: 'Asia/Yekaterinburg',
			})

			const message = [
				'📝 <b>Новая заявка — Remito</b>',
				'————————————————————',
				`👤 <b>Имя:</b> ${name}`,
				`📞 <b>Телефон:</b> ${phone}`,
				`🔧 <b>Вопрос/услуга:</b> ${question}`,
				`🔐 <b>Согласие:</b> ${consentField?.checked ? '✅' : '❌'}`,
				'————————————————————',
				`⏰ ${time}`,
			].join('\n')

			/* ---- Отправка в Telegram ---- */
			try {
				const res = await fetch(
					`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							chat_id: TELEGRAM_CHAT_ID,
							text: message,
							parse_mode: 'HTML',
						}),
					},
				)

				const data = await res.json()
				if (!data.ok) throw new Error(data.description)

				/* ---- Успех ---- */
				form.reset()

				// Яндекс.Метрика цель
				if (typeof ym !== 'undefined') {
					ym(106420255, 'reachGoal', 'FORM_SENT')
				}

				// URL без перезагрузки (для аналитики)
				history.pushState(null, '', '/?form=sent')

				// Показываем Thank You попап
				if (typeof showThankYou === 'function') {
					showThankYou()
				}

			} catch (err) {
				console.error('Telegram send error:', err)
				alert('Ошибка отправки. Пожалуйста, позвоните нам напрямую.')
			} finally {
				/* ---- Кнопка: reset ---- */
				if (submitBtn) {
					submitBtn.disabled = false
					submitBtn.classList.remove('is-loading')
				}
			}
		})
	})
}