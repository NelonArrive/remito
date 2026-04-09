import { IconCart } from '@/shared/ui/Icons'
import Link from 'next/link'
import { Product } from '../../model/products.types'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
	product: Product
	onQuickView: (id: string) => void
}

const badgeClass: Record<string, string> = {
	hit: 'badgeHit',
	new: 'badgeNew',
	sale: 'badgeSale',
	orig: 'badgeOrig'
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
	const { id, href, visualBg, badges, brand, title, compat, specs, priceOld, price } = product

	return (
		<div className={styles.card}>
			{badges.length > 0 && (
				<div className={styles.badges}>
					{badges.map(b => (
						<span key={b.type} className={`${styles.badge} ${styles[badgeClass[b.type]]}`}>
							{b.label}
						</span>
					))}
				</div>
			)}

			<div className={styles.visual} style={visualBg ? { background: visualBg } : undefined}>
				<span className={styles.visualImg} aria-hidden>
					🖨️
				</span>
				<button className={styles.quickView} onClick={() => onQuickView(id)} type='button'>
					Быстрый просмотр
				</button>
			</div>

			<div className={styles.body}>
				<span className={styles.brand}>{brand}</span>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.compat}>{compat}</p>
				<div className={styles.specs}>
					{specs.map(spec => (
						<span key={spec} className={styles.spec}>
							{spec}
						</span>
					))}
				</div>
			</div>

			{/* Футер */}
			<div className={styles.footer}>
				<div className={styles.priceBlock}>
					{priceOld && <span className={styles.priceOld}>{priceOld.toLocaleString('ru')} ₽</span>}
					<span className={styles.price}>
						{price.toLocaleString('ru')} <em>₽</em>
					</span>
				</div>
				<Link href={href} className={styles.buy}>
					<IconCart />
					Купить
				</Link>
			</div>
		</div>
	)
}
