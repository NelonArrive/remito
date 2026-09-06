import type { ReactNode } from 'react'
import s from './WebSection.module.scss'

interface WebSectionProps {
	children: ReactNode
	tone?: 'light' | 'dark' | 'gray'
	className?: string
	id?: string
}

export function WebSection({ children, tone = 'light', className = '', id }: WebSectionProps) {
	return (
		<section id={id} className={`${s.section} ${s[tone]} ${className}`}>
			<div className={s.container}>{children}</div>
		</section>
	)
}

interface WebSectionHeadProps {
	tag: string
	title: ReactNode
	desc?: string
	align?: 'left' | 'center'
}

export function WebSectionHead({ tag, title, desc, align = 'center' }: WebSectionHeadProps) {
	return (
		<div className={`${s.head} ${s[`head_${align}`]}`}>
			<span className={s.headTag}>{tag}</span>
			<h2 className={s.headTitle}>{title}</h2>
			{desc && <p className={s.headDesc}>{desc}</p>}
		</div>
	)
}
