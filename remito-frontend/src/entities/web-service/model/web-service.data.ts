import type {
	WebAdvantage,
	WebFaqItem,
	WebPortfolioStub,
	WebService,
	WebServiceDetail,
	WebServiceSlug,
	WebStep,
	WebTariff
} from './web-service.types'

export const WEB_BASE_PATH = '/web'

export const WEB_SERVICES: WebService[] = [
	{
		id: 'landing',
		slug: 'landing',
		title: 'Лендинг',
		shortTitle: 'Лендинг',
		description: 'Одностраничный сайт под конкретную задачу: заявки, продажи, запуск услуги.',
		previewText: 'Продаёт одну услугу или продукт. Быстрый запуск и понятная структура.',
		priceFrom: 25_000,
		pages: '1 страница',
		days: 'от 14 дней',
		href: `${WEB_BASE_PATH}/landing/`,
		icon: 'Layout',
		color: '#6366F1',
		colorLight: '#EEF2FF'
	},
	{
		id: 'sayt-vizitka',
		slug: 'sayt-vizitka',
		title: 'Сайт-визитка',
		shortTitle: 'Сайт-визитка',
		description: 'Компактный сайт о компании: услуги, контакты, доверие — без лишнего.',
		previewText: 'До 5 страниц. Подходит для ИП, мастеров и небольших команд.',
		priceFrom: 35_000,
		pages: 'до 5 страниц',
		days: 'от 14 дней',
		href: `${WEB_BASE_PATH}/sayt-vizitka/`,
		icon: 'Globe',
		color: '#3A86FF',
		colorLight: '#EEF4FF'
	},
	{
		id: 'korporativnyy-sayt',
		slug: 'korporativnyy-sayt',
		title: 'Корпоративный сайт',
		shortTitle: 'Корпоративный',
		description: 'Полноценный сайт компании с разделами, блогом и SEO-структурой.',
		previewText: 'До 15 страниц. Для бизнеса, которому нужен серьёзный онлайн-образ.',
		priceFrom: 55_000,
		pages: 'до 15 страниц',
		days: 'от 30 дней',
		href: `${WEB_BASE_PATH}/korporativnyy-sayt/`,
		icon: 'Building2',
		color: '#14B8A6',
		colorLight: '#F0FDFA'
	},
	{
		id: 'internet-magazin',
		slug: 'internet-magazin',
		title: 'Интернет-магазин',
		shortTitle: 'Интернет-магазин',
		description: 'Каталог, корзина, оплата и личный кабинет — всё для онлайн-продаж.',
		previewText: 'Масштабируемая витрина с удобным управлением товарами.',
		priceFrom: 90_000,
		pages: 'без ограничений',
		days: 'от 45 дней',
		href: `${WEB_BASE_PATH}/internet-magazin/`,
		icon: 'ShoppingCart',
		color: '#F97316',
		colorLight: '#FFF7ED'
	}
]

export const WEB_TARIFFS: WebTariff[] = [
	{
		id: 'start',
		name: 'Старт',
		priceFrom: 25_000,
		description: 'Лендинг или визитка для быстрого старта',
		pages: '1–5 страниц',
		days: '14 дней',
		features: [
			'Адаптивная вёрстка',
			'Базовая SEO-настройка',
			'Форма заявки',
			'Подключение аналитики',
			'Обучение работе с сайтом'
		]
	},
	{
		id: 'business',
		name: 'Бизнес',
		priceFrom: 55_000,
		description: 'Корпоративный сайт под рост компании',
		pages: 'до 15 страниц',
		days: '30 дней',
		featured: true,
		features: [
			'Уникальный дизайн',
			'Расширенная SEO-структура',
			'Блог / новости',
			'Интеграции (CRM, мессенджеры)',
			'1 месяц поддержки'
		]
	},
	{
		id: 'pro',
		name: 'Про',
		priceFrom: 90_000,
		description: 'Интернет-магазин или сложный проект',
		pages: 'без ограничений',
		days: '45 дней',
		features: [
			'Каталог и корзина',
			'Онлайн-оплата',
			'Личный кабинет',
			'Админ-панель',
			'2 месяца поддержки'
		]
	}
]

export const WEB_STEPS: WebStep[] = [
	{
		step: 1,
		title: 'Бриф и анализ',
		description: 'Обсуждаем задачу, аудиторию, конкурентов. Фиксируем структуру и сроки.',
		duration: '1–2 дня'
	},
	{
		step: 2,
		title: 'Дизайн',
		description: 'Прототип и визуал. Согласуем до разработки — без сюрпризов на финале.',
		duration: '3–7 дней'
	},
	{
		step: 3,
		title: 'Разработка',
		description: 'Вёрстка на Next.js, адаптив, скорость, SEO-разметка и формы.',
		duration: '7–30 дней'
	},
	{
		step: 4,
		title: 'Запуск',
		description: 'Деплой, домен, аналитика. Передаём доступы и показываем, как управлять.',
		duration: '1–2 дня'
	}
]

export const WEB_ADVANTAGES: WebAdvantage[] = [
	{
		title: 'Next.js из коробки',
		description: 'Современный стек: быстрые страницы, SSR и удобное масштабирование.',
		icon: 'Code2'
	},
	{
		title: 'Скорость загрузки',
		description: 'Оптимизация изображений и кода — сайт не тормозит на мобильных.',
		icon: 'Zap'
	},
	{
		title: 'SEO-структура',
		description: 'Мета-теги, семантика, sitemap — основа для продвижения в поиске.',
		icon: 'Search'
	},
	{
		title: 'Адаптив на всех экранах',
		description: 'Сайт одинаково удобен на телефоне, планшете и десктопе.',
		icon: 'Smartphone'
	},
	{
		title: 'Поддержка после запуска',
		description: 'Не бросаем после сдачи — помогаем с правками и доработками.',
		icon: 'Headphones'
	}
]

export const WEB_FAQ: WebFaqItem[] = [
	{
		id: '1',
		question: 'Сколько стоит сайт под ключ?',
		answer:
			'Зависит от типа: лендинг — от 25 000 ₽, корпоративный — от 55 000 ₽, интернет-магазин — от 90 000 ₽. Точную смету даём после брифа.'
	},
	{
		id: '2',
		question: 'Какие сроки разработки?',
		answer:
			'Лендинг — от 14 дней, корпоративный сайт — около 30 дней, магазин — от 45 дней. Сроки зависят от объёма и скорости согласований.'
	},
	{
		id: '3',
		question: 'Нужен ли мне свой домен и хостинг?',
		answer:
			'Да, домен регистрируете на себя. Хостинг подберём вместе — часто используем Vercel или аналоги для Next.js. Поможем с подключением.'
	},
	{
		id: '4',
		question: 'Можно ли править контент самостоятельно?',
		answer:
			'Да. После запуска покажем, как обновлять тексты и изображения. При необходимости подключим CMS или админку.'
	},
	{
		id: '5',
		question: 'Делаете ли вы SEO-продвижение?',
		answer:
			'Мы закладываем техническое SEO при разработке. Отдельное продвижение в топ — по запросу, можем порекомендовать партнёров.'
	},
	{
		id: '6',
		question: 'Что если мне нужны доработки после запуска?',
		answer:
			'В тарифах есть период поддержки. Дальше — почасово или по абонементу, как удобнее вам.'
	}
]

export const WEB_PORTFOLIO_STUBS: WebPortfolioStub[] = [
	{ id: '1', title: 'Сервис ремонта техники', category: 'Корпоративный сайт', status: 'soon' },
	{ id: '2', title: 'Лендинг для клиники', category: 'Лендинг', status: 'soon' },
	{ id: '3', title: 'Магазин расходников', category: 'Интернет-магазин', status: 'soon' },
	{ id: '4', title: 'Сайт для строительной бригады', category: 'Сайт-визитка', status: 'soon' }
]

const SERVICE_DETAILS: Record<WebServiceSlug, Omit<WebServiceDetail, keyof WebService>> = {
	landing: {
		heroSubtitle: 'Одна страница — одна цель: заявки, звонки, продажи',
		includes: [
			'Прототип и дизайн',
			'Адаптивная вёрстка',
			'Форма заявки',
			'Подключение аналитики',
			'Базовая SEO-настройка',
			'Деплой и запуск'
		],
		faq: [
			{
				question: 'Чем лендинг отличается от визитки?',
				answer: 'Лендинг — одна длинная страница под одну цель. Визитка — несколько разделов о компании.'
			},
			{
				question: 'Можно ли потом расширить до полноценного сайта?',
				answer: 'Да, на Next.js это проще — добавим страницы без полной переделки.'
			},
			{
				question: 'Нужен ли готовый текст и фото?',
				answer: 'Желательно, но поможем со структурой и подскажем, что подготовить. Тексты можем доработать вместе.'
			},
			{
				question: 'Подключите аналитику и формы?',
				answer: 'Да: Яндекс.Метрика, Google Analytics, форма заявки и уведомления на почту или в мессенджер.'
			}
		]
	},
	'sayt-vizitka': {
		heroSubtitle: 'Небольшой сайт, который представляет вас и ваши услуги',
		includes: [
			'До 5 страниц',
			'Уникальный дизайн',
			'Контакты и карта',
			'Форма обратной связи',
			'SEO-основа',
			'Мобильная версия'
		],
		faq: [
			{
				question: 'Какие страницы обычно входят?',
				answer: 'Главная, услуги, о компании, контакты — по вашей задаче.'
			},
			{
				question: 'Подойдёт для ИП и самозанятых?',
				answer: 'Да, это самый частый формат: компактно, понятно, без лишних разделов.'
			},
			{
				question: 'Можно добавить прайс или каталог услуг?',
				answer: 'Да, сделаем отдельную страницу или блок на главной — как удобнее клиентам.'
			},
			{
				question: 'Сколько правок на этапе дизайна?',
				answer: '2 раунда правок в базовом пакете. Крупные изменения структуры обсуждаем отдельно.'
			}
		]
	},
	'korporativnyy-sayt': {
		heroSubtitle: 'Сайт компании с разделами, блогом и местом для роста',
		includes: [
			'До 15 страниц',
			'Блог / новости',
			'Расширенная SEO-структура',
			'Интеграции (CRM, чаты)',
			'Админ-зона или CMS',
			'Месяц поддержки'
		],
		faq: [
			{
				question: 'Подойдёт ли для B2B?',
				answer: 'Да, структуру делаем под вашу воронку: кейсы, услуги, заявки.'
			},
			{
				question: 'Нужна ли CMS для обновления контента?',
				answer: 'По желанию: можем подключить headless CMS или простую админку для новостей и страниц.'
			},
			{
				question: 'Делаете мультиязычность?',
				answer: 'Да, если нужен второй язык — заложим в структуру и SEO с самого начала.'
			},
			{
				question: 'Какие интеграции возможны?',
				answer: 'CRM, чаты, калькуляторы, карты, формы в Bitrix24/amoCRM — обсудим на брифе.'
			}
		]
	},
	'internet-magazin': {
		heroSubtitle: 'Продавайте онлайн с каталогом, корзиной и оплатой',
		includes: [
			'Каталог товаров',
			'Корзина и оформление',
			'Онлайн-оплата',
			'Личный кабинет покупателя',
			'Админ-панель',
			'2 месяца поддержки'
		],
		faq: [
			{
				question: 'Какие платёжные системы подключаете?',
				answer: 'ЮKassa, Тинькофф, Robokassa — обсудим на брифе, что удобнее вам.'
			},
			{
				question: 'Откуда загружать товары?',
				answer: 'Через админ-панель вручную или импорт из Excel/1С — зависит от объёма каталога.'
			},
			{
				question: 'Нужна ли доставка и расчёт стоимости?',
				answer: 'Да, подключим службы доставки или фиксированные тарифы по регионам.'
			},
			{
				question: 'Можно ли начать с небольшого каталога?',
				answer: 'Да, запустим MVP с основными категориями и расширим каталог после старта продаж.'
			}
		]
	}
}

const SERVICE_PORTFOLIO_CATEGORY: Record<WebServiceSlug, string> = {
	landing: 'Лендинг',
	'sayt-vizitka': 'Сайт-визитка',
	'korporativnyy-sayt': 'Корпоративный сайт',
	'internet-magazin': 'Интернет-магазин'
}

export const getWebServiceBySlug = (slug: string): WebServiceDetail | undefined => {
	const base = WEB_SERVICES.find(s => s.slug === slug)
	if (!base) return undefined
	const extra = SERVICE_DETAILS[base.slug as WebServiceSlug]
	if (!extra) return undefined
	return { ...base, ...extra }
}

export const getWebPortfolioForService = (slug: WebServiceSlug) => {
	const category = SERVICE_PORTFOLIO_CATEGORY[slug]
	const matched = WEB_PORTFOLIO_STUBS.filter(item => item.category === category)
	return matched.length > 0 ? matched : WEB_PORTFOLIO_STUBS.slice(0, 3)
}

export const getWebServiceList = () => WEB_SERVICES
