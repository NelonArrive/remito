const PHONE_DIGITS_LENGTH = 11

export function normalizePhoneDigits(value: string): string {
	let digits = value.replace(/\D/g, '')

	if (digits.startsWith('8') && digits.length === PHONE_DIGITS_LENGTH) {
		digits = `7${digits.slice(1)}`
	}

	if (digits.length === 10 && digits.startsWith('9')) {
		digits = `7${digits}`
	}

	return digits
}

export function isValidRussianPhone(value: string): boolean {
	const digits = normalizePhoneDigits(value)
	return digits.length === PHONE_DIGITS_LENGTH && digits.startsWith('7')
}

export function formatPhoneDisplay(value: string): string {
	const digits = normalizePhoneDigits(value)
	if (digits.length !== PHONE_DIGITS_LENGTH) return value.trim()

	return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`
}

export const PHONE_ERROR_MESSAGE = 'Введите корректный номер: +7 XXX XXX XX XX'
