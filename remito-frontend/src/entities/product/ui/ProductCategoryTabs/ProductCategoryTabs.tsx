'use client'

import type { ProductCategorySlug } from '../../model/product.types'
import { PRODUCT_CATEGORY_TABS, countProductsByCategory } from '../../lib/product.helpers'
import styles from './ProductCategoryTabs.module.scss'

interface ProductCategoryTabsProps {
	activeTab: ProductCategorySlug
	onChange: (tab: ProductCategorySlug) => void
	className?: string
}

export const ProductCategoryTabs = ({ activeTab, onChange, className = '' }: ProductCategoryTabsProps) => {
	return (
		<div className={`${styles.tabs} ${className}`} role='tablist'>
			{PRODUCT_CATEGORY_TABS.map(tab => (
				<button
					key={tab.id}
					role='tab'
					type='button'
					aria-selected={activeTab === tab.id}
					className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
					onClick={() => onChange(tab.id)}
				>
					{tab.emoji && <span aria-hidden>{tab.emoji}</span>}
					{tab.label}
					<span className={styles.tabCount}>{countProductsByCategory(tab.id)}</span>
				</button>
			))}
		</div>
	)
}
