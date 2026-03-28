import type { NavLink } from '@/shared/types/common.types'

export const NAV_LINKS: NavLink[] = [
	{
		label: 'Услуги',
		href: '/remont/',
		children: [
			{ label: 'Ремонт принтеров', href: '/remont/printer/' },
			{ label: 'Ремонт МФУ', href: '/remont/mfu/' },
			{ label: 'Ремонт ноутбуков', href: '/remont/noutbuk/' },
			{ label: 'Ремонт компьютеров', href: '/remont/kompyuter/' }
		]
	},
	{ label: 'Заправка', href: '/zapravka-kartridzhey/' },
	{ label: 'Товары', href: '/tovary/' },
	{ label: 'Блог', href: '/blog/' },
	{ label: 'Контакты', href: '/kontakty/' },
	{ label: 'Web', href: '/web-uslugi/', badge: 'NEW' }
]
