export type BrandId =
	| 'canon'
	| 'hp'
	| 'xerox'
	| 'samsung'
	| 'epson'
	| 'brother'
	| 'kyocera'
	| 'ricoh'
	| 'pantum'
	| 'oki'
	| 'lexmark'
	| 'konica'
	| 'lenovo'
	| 'apple'
	| 'asus'
	| 'acer'
	| 'dell'
	| 'msi'

export interface Brand {
	id: BrandId
	name: string
}

export const BRANDS_ROW_1: Brand[] = [
	{ id: 'canon', name: 'Canon' },
	{ id: 'hp', name: 'HP' },
	{ id: 'xerox', name: 'Xerox' },
	{ id: 'samsung', name: 'Samsung' },
	{ id: 'epson', name: 'Epson' },
	{ id: 'brother', name: 'Brother' },
	{ id: 'kyocera', name: 'Kyocera' },
	{ id: 'ricoh', name: 'Ricoh' },
	{ id: 'pantum', name: 'Pantum' },
]

export const BRANDS_ROW_2: Brand[] = [
	{ id: 'oki', name: 'Oki' },
	{ id: 'lexmark', name: 'Lexmark' },
	{ id: 'konica', name: 'Konica Minolta' },
	{ id: 'lenovo', name: 'Lenovo' },
	{ id: 'apple', name: 'Apple' },
	{ id: 'asus', name: 'ASUS' },
	{ id: 'acer', name: 'Acer' },
	{ id: 'dell', name: 'Dell' },
	{ id: 'msi', name: 'MSI' },
]
