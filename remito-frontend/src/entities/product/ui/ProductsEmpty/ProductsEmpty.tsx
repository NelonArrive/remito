import { CONTACTS } from '@/entities/legal'
import { Button } from '@/shared/ui/Button'
import { Package, Phone } from 'lucide-react'
import styles from './ProductsEmpty.module.scss'

interface ProductsEmptyProps {
	compact?: boolean
}

export function ProductsEmpty({ compact = false }: ProductsEmptyProps) {
	return (
		<div className={`${styles.empty} ${compact ? styles.compact : ''}`}>
			<div className={styles.icon}>
				<Package size={compact ? 28 : 32} />
			</div>
			<h3 className={styles.title}>Товары скоро появятся</h3>
			<p className={styles.desc}>
				Сейчас каталог пуст — готовим ассортимент картриджей и расходников. Оставьте заявку, подберём нужную
				позицию и сообщим о поступлении.
			</p>
			<div className={styles.actions}>
				<Button variant='primary' data-popup='open' icon={<Phone size={15} />}>
					Узнать о наличии
				</Button>
				<a href={`tel:${CONTACTS.phoneRaw}`} className={styles.phoneLink}>
					{CONTACTS.phone}
				</a>
			</div>
		</div>
	)
}
