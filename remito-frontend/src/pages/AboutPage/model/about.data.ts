export interface AboutStat {
	num: string
	label: string
}

export interface AboutValue {
	title: string
	desc: string
	color: string
	colorLight: string
}

export const ABOUT_STATS: AboutStat[] = [
	{ num: '2016', label: 'год основания' },
	{ num: '2 000+', label: 'отремонтировано устройств' },
	{ num: '90 дней', label: 'гарантия на все работы' },
	{ num: '500+', label: 'моделей в базе' }
]

export const ABOUT_VALUES: AboutValue[] = [
	{
		title: 'Честность прежде всего',
		desc: 'Называем цену до начала работ. Если ремонт нецелесообразен — скажем прямо. Никаких скрытых платежей.',
		color: '#3A86FF',
		colorLight: '#EEF4FF'
	},
	{
		title: 'Берём ответственность',
		desc: 'Если что-то пошло не так по нашей вине — возвращаемся и исправляем бесплатно. Гарантия — не просто слова.',
		color: '#22C55E',
		colorLight: '#F0FDF4'
	},
	{
		title: 'Уважаем ваше время',
		desc: 'Выезжаем в течение часа, работаем без выходных. Понимаем, что сломанная техника — это всегда срочно.',
		color: '#F97316',
		colorLight: '#FFF7ED'
	},
	{
		title: 'Говорим понятно',
		desc: 'Объясняем что сломалось и почему — без технического жаргона. Вы всегда знаете за что платите.',
		color: '#8B5CF6',
		colorLight: '#F5F3FF'
	}
]
