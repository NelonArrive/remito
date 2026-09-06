import { getProductHref, getProductSpecs, getProductVisualBg, isProductInStock } from '../../lib/product.helpers'
import type { Product } from '../../model/product.types'
import { IconCart } from '@/shared/ui/Icons'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
	product: Product
	onQuickView?: (id: number) => void
	className?: string
}

const badgeClass: Record<string, string> = {
	hit: 'badgeHit',
	new: 'badgeNew',
	sale: 'badgeSale',
	original: 'badgeOrig',
	compat: 'badgeCompat'
}

const kindEmoji: Record<Product['productKind'], string> = {
	cartridge: '🖨️',
	ink: '💧',
	drum: '⚙️',
	toner: '🖨️',
	paper: '📄',
	other: '📦'
}

export const ProductCard = ({ product, onQuickView, className = '' }: ProductCardProps) => {
	const inStock = isProductInStock(product)
	const specs = getProductSpecs(product)
	const href = getProductHref(product)
	const visualStyle = { background: getProductVisualBg(product) } as CSSProperties

	return (
		<div className={`${styles.card} ${!inStock ? styles.cardOutOfStock : ''} ${className}`}>
			<div className={styles.badges}>
				{product.badges.map(badge => (
					<span key={`${badge.type}-${badge.label}`} className={`${styles.badge} ${styles[badgeClass[badge.type]]}`}>
						{badge.label}
					</span>
				))}
				{!inStock && <span className={`${styles.badge} ${styles.badgeStock}`}>Нет в наличии</span>}
			</div>

			<div className={styles.visual} style={visualStyle}>
				<span className={styles.visualImg} aria-hidden>
					{kindEmoji[product.productKind]}
				</span>
				{onQuickView && (
					<button className={styles.quickView} onClick={() => onQuickView(product.id)} type='button'>
						Быстрый просмотр
					</button>
				)}
			</div>

			<div className={styles.body}>
				<span className={styles.brand}>{product.brandName}</span>
				<h3 className={styles.title}>{product.name}</h3>
				<p className={styles.compat}>{product.compatibility}</p>
				<div className={styles.specs}>
					{specs.map(spec => (
						<span
							key={spec.key}
							className={styles.spec}
							style={spec.colorHex ? ({ '--spec-color': spec.colorHex } as CSSProperties) : undefined}
						>
							{spec.colorHex && <span className={styles.specDot} aria-hidden />}
							{spec.label}
						</span>
					))}
				</div>
			</div>

			<div className={styles.footer}>
				<div className={styles.priceBlock}>
					{product.priceOld && (
						<span className={styles.priceOld}>{product.priceOld.toLocaleString('ru')} ₽</span>
					)}
					<span className={styles.price}>
						{product.price.toLocaleString('ru')} <em>₽</em>
					</span>
				</div>
				{inStock ? (
					<Link href={href} className={styles.buy}>
						<IconCart />
						Купить
					</Link>
				) : (
					<button className={styles.buyDisabled} type='button' data-popup='open'>
						Узнать о наличии
					</button>
				)}
			</div>
		</div>
	)
}
