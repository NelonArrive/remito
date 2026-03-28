import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

type ButtonVariant = 'cta' | 'outline' | 'primary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	icon?: ReactNode
	children?: ReactNode
	className?: string
}

export const Button = ({ variant = 'primary', icon, children, className = '', ...rest }: ButtonProps) => {
	return (
		<button className={`${styles.btn} ${styles[variant]} ${className}`} {...rest}>
			{icon && icon}
			{children && <span>{children}</span>}
		</button>
	)
}
