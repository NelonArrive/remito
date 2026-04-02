export type BadgeType = 'hit' | 'new' | 'sale' | 'orig';
export type Category = 'all' | 'laser' | 'inkjet' | 'drum';

export interface ProductBadge {
  type: BadgeType;
  label: string;
}

export interface Product {
  id: string;
  href: string;
  category: Exclude<Category, 'all'>;
  visualBg?: string;       // цвет фона карточки (опционально)
  badges: ProductBadge[];
  brand: string;
  title: string;
  compat: string;
  specs: string[];
  priceOld?: number;
  price: number;
}

export interface Tab {
  id: Category;
  label: string;
  emoji?: string;
}