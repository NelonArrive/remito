'use client'

import { IMaskInput } from 'react-imask'

interface PhoneInputProps {
	id?: string
	name?: string
	value: string
	className?: string
	hasError?: boolean
	onAccept: (value: string) => void
}

export function PhoneInput({ hasError, className, onAccept, ...props }: PhoneInputProps) {
	return (
		<IMaskInput
			mask='+{7} (000) 000-00-00'
			unmask={false}
			lazy={false}
			placeholder='+7 (___) ___-__-__'
			autoComplete='tel'
			inputMode='tel'
			className={`${className ?? ''}${hasError ? ' is-error' : ''}`}
			aria-invalid={hasError || undefined}
			onAccept={value => onAccept(String(value))}
			{...props}
		/>
	)
}
