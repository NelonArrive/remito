export interface FormSubmission {
	name?: string
	phone: string
	service?: string
	comment?: string
	source: string
}

function formatMessage(data: FormSubmission): string {
	const lines = [
		'📩 Новая заявка',
		'',
		`📍 Источник: ${data.source}`,
		`📞 Телефон: ${data.phone}`
	]

	if (data.name?.trim()) lines.push(`👤 Имя: ${data.name.trim()}`)
	if (data.service?.trim()) lines.push(`🔧 Услуга: ${data.service.trim()}`)
	if (data.comment?.trim()) lines.push(`💬 Комментарий: ${data.comment.trim()}`)

	return lines.join('\n')
}

function mapTelegramError(description?: string): string {
	if (!description) return 'Не удалось отправить заявку'

	if (description.includes('chat not found')) {
		return 'Telegram: чат не найден. Напишите боту /start и проверьте NEXT_PUBLIC_TELEGRAM_CHAT_ID в .env.local'
	}

	if (description.includes("can't parse entities")) {
		return 'Не удалось отправить заявку. Попробуйте ещё раз.'
	}

	return description
}

export async function sendFormToTelegram(data: FormSubmission): Promise<void> {
	const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
	const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

	if (!token || !chatId) {
		throw new Error(
			'Telegram bot не настроен. Укажите NEXT_PUBLIC_TELEGRAM_BOT_TOKEN и NEXT_PUBLIC_TELEGRAM_CHAT_ID в .env.local'
		)
	}

	const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: chatId,
			text: formatMessage(data)
		})
	})

	const result = await response.json().catch(() => null)

	if (!response.ok || !result?.ok) {
		throw new Error(mapTelegramError(result?.description))
	}
}
