import type { Product } from './product.types'

/**
 * Единственный источник данных каталога в runtime.
 * Подключение API: заменить на fetch и записывать сюда или в state.
 *
 * Примеры товаров для разработки — в product.mocks.ts (не импортировать в UI).
 */
export const PRODUCTS_DATA: Product[] = []
