import type { ServiceItem } from './services.types'

export const SERVICES: ServiceItem[] = [
	{
		id: 'printer',
		color: '#3A86FF',
		title: 'Ремонт принтеров и МФУ',
		description: 'Лазерные и струйные принтеры, МФУ всех брендов. Любая сложность — от замятия до замены термоузла.',
		list: [
			'Canon, HP, Xerox, Samsung, Epson, Brother',
			'Термоузел, ролики, картридж, плата',
			'Гарантия 90 дней на все работы'
		],
		price: '500 ₽',
		href: '/remont/printer/',
		featured: true
	},
	{
		id: 'cartridge',
		color: '#22C55E',
		title: 'Заправка картриджей',
		description: 'Лазерные и струйные. Оригинальный тонер. Восстановление барабана. Готово за 1–2 часа.',
		list: ['500+ моделей', 'Выезд или самовывоз'],
		price: '350 ₽',
		href: '/zapravka-kartridzhey/'
	},
	{
		id: 'laptop',
		color: '#F97316',
		title: 'Ремонт ноутбуков',
		description: 'Не включается, треснул экран, не заряжается — ремонтируем быстро с гарантией.',
		list: ['Замена матрицы, клавиатуры', 'Чистка и замена термопасты'],
		price: '800 ₽',
		href: '/remont/noutbuk/'
	},
	{
		id: 'computer',
		color: '#8B5CF6',
		title: 'Ремонт компьютеров',
		description: 'Диагностика, чистка, апгрейд, замена компонентов. Настройка Windows и ПО.',
		list: ['Замена HDD → SSD', 'Удаление вирусов'],
		price: '600 ₽',
		href: '/remont/kompyuter/'
	},
	{
		id: 'shop',
		color: '#EC4899',
		title: 'Продажа картриджей',
		description: 'Оригинальные и совместимые картриджи в наличии. Доставка по Екатеринбургу.',
		list: ['1 000+ позиций', 'Доставка от 1 дня'],
		price: '450 ₽',
		href: '/tovary/',
		linkLabel: 'В каталог'
	}
]
