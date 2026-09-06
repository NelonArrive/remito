export const REQUISITES = {
	name: 'Индивидуальный предприниматель Половников Алексей Васильевич',
	inn: '665818248750',
	ogrnip: '319665800023440',
	account: '40802810102500042682',
	bankName: 'ООО "Банк Точка"',
	bankInn: '9721194461',
	bankCorr: '30101810745374525104',
	bankAddress:
		'109044, РФ, г. Москва, вн.тер.г. муниципальный округ Южнопортовый, пер. 3-й Крутицкий, д.11, помещ. 7Н'
} as const

export const LEGAL = {
	siteUrl: 'https://ремито.рф',
	siteName: 'Remito',
	operatorName: REQUISITES.name,
	inn: REQUISITES.inn,
	ogrnip: REQUISITES.ogrnip,
	phone: '+7 963 037 61 82',
	phoneRaw: '+79630376182',
	email: 'info@ремито.рф',
	operatorAddress: 'г. Екатеринбург, Российская Федерация',
	updatedAt: '27.05.2026',
	requisites: REQUISITES,
	services: [
		'ремонт принтеров и МФУ',
		'заправка картриджей',
		'ремонт ноутбуков и компьютеров',
		'чистка ноутбуков',
		'установка и настройка Windows',
		'восстановление данных'
	],
	analytics: ['Яндекс.Метрика', 'Google Analytics'],
	hasCookieBanner: true
} as const

export const CONTACTS = {
	phone: LEGAL.phone,
	phoneRaw: LEGAL.phoneRaw,
	email: LEGAL.email,
	hours: 'Ежедневно с 9:00 до 21:00',
	telegram: 'https://t.me/remito_official',
	whatsapp: 'https://wa.me/79530526260',
	vk: 'https://vk.com/remito_official',
	gis2: 'https://2gis.ru/ekaterinburg/firm/70000001035776034'
} as const
