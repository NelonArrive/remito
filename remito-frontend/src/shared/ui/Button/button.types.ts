import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'cta' | 'outline' | 'primary' | 'ghost'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	icon?: ReactNode
	children?: ReactNode
	className?: string
}