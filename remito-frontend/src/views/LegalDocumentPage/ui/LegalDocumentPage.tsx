import { LEGAL } from '@/entities/legal'
import Link from 'next/link'
import type { ReactNode } from 'react'
import s from './LegalDocumentPage.module.scss'

type LegalDocType = 'privacy' | 'oferta' | 'terms'

const NAV: { href: string; label: string; type: LegalDocType }[] = [
	{ href: '/privacy/', label: 'Конфиденциальность', type: 'privacy' },
	{ href: '/oferta/', label: 'Оферта', type: 'oferta' },
	{ href: '/terms/', label: 'Условия сайта', type: 'terms' }
]

interface LegalDocumentPageProps {
	type: LegalDocType
	title: string
	subtitle: string
	children: ReactNode
}

export function LegalDocumentPage({ type, title, subtitle, children }: LegalDocumentPageProps) {
	return (
		<main className={s.page}>
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>

				<div className={s.heroInner}>
					<nav className={s.breadcrumbs} aria-label='Хлебные крошки'>
						<Link href='/' className={s.breadcrumbLink}>
							Главная
						</Link>
						<span className={s.breadcrumbSep}>/</span>
						<span className={s.breadcrumbCurrent}>{title}</span>
					</nav>

					<span className={s.heroTag}>Документы</span>
					<h1 className={s.heroTitle}>{title}</h1>
					<p className={s.heroDesc}>{subtitle}</p>
					<p className={s.heroMeta}>
						Актуально: {LEGAL.updatedAt} · {LEGAL.siteUrl}
					</p>
				</div>
			</section>

			<section className={s.body}>
				<div className={s.container}>
					<aside className={s.sidebar}>
						<div className={s.sidebarCard}>
							<span className={s.sidebarTitle}>Документы</span>
							<nav className={s.sidebarNav}>
								{NAV.map(item => (
									<Link
										key={item.type}
										href={item.href}
										className={`${s.sidebarLink} ${item.type === type ? s.sidebarLinkActive : ''}`}
									>
										{item.label}
									</Link>
								))}
							</nav>
						</div>

						<div className={s.sidebarCard}>
							<span className={s.sidebarTitle}>Контакты</span>
							<div className={s.sidebarContacts}>
								<a href={`tel:${LEGAL.phoneRaw}`}>{LEGAL.phone}</a>
								<a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
							</div>
						</div>
					</aside>

					<article className={s.article}>{children}</article>
				</div>
			</section>
		</main>
	)
}

export function LegalSection({
	title,
	children,
	id
}: {
	id?: string
	title: string
	children: ReactNode
}) {
	return (
		<section id={id} className={s.section}>
			<h2 className={s.sectionTitle}>{title}</h2>
			<div className={s.sectionBody}>{children}</div>
		</section>
	)
}

export function LegalP({ children }: { children: ReactNode }) {
	return <p className={s.p}>{children}</p>
}

export function LegalList({ items }: { items: string[] }) {
	return (
		<ul className={s.list}>
			{items.map(item => (
				<li key={item}>{item}</li>
			))}
		</ul>
	)
}

export function LegalRequisitesBlock() {
	const r = LEGAL.requisites

	return (
		<div className={s.requisites}>
			<p>
				<strong>{LEGAL.operatorName}</strong>
			</p>
			<p>ИНН: {LEGAL.inn}</p>
			<p>ОГРНИП: {LEGAL.ogrnip}</p>
			<p>Р/с: {r.account}</p>
			<p>Банк: {r.bankName}</p>
			<p>ИНН банка: {r.bankInn}</p>
			<p>К/с: {r.bankCorr}</p>
			<p>Адрес банка: {r.bankAddress}</p>
		</div>
	)
}
