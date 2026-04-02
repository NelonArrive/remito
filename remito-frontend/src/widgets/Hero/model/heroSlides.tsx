import type { HeroSlideData } from '../ui/HeroSlide/HeroSlide';

const PrinterIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const CartridgeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const WebIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z" />
  </svg>
);

const ChatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const heroSlides: HeroSlideData[] = [
  {
    id: 'slide-1',
    theme: 'slide1',
    badge: 'Бесплатный выезд мастера',
    title: <>Ремонт оргтехники<br /> в <em>Екатеринбурге</em></>,
    desc: 'Canon, HP, Xerox, Samsung, Epson — ремонтируем любые модели. Диагностика бесплатно. Выезд в день обращения.',
    btnPrimary: { label: 'Вызвать мастера', icon: <PhoneIcon /> },
    btnOutline: { label: 'Узнать стоимость →', href: '/remont/printer' },
    stats: [
      { num: '2 000+', label: 'Ремонтов в год' },
      { num: '1 час', label: 'Выезд мастера' },
      { num: '90 дней', label: 'Гарантия' },
    ],
    card: {
      floatTL: { icon: '🖨️', iconBg: '#EEF4FF', title: 'Принтер HP LaserJet', sub: 'Диагностика завершена' },
      floatBR: { icon: '✅', iconBg: '#DCFCE7', title: 'Гарантия 90 дней', sub: 'На все виды работ' },
      icon: <PrinterIcon />,
      title: 'Ремонт принтеров и МФУ',
      items: [
        { text: 'Замятие бумаги — от 500 ₽' },
        { text: 'Ремонт термоузла — от 1 200 ₽' },
        { text: 'Чистка и профилактика — 800 ₽' },
        { text: 'Замена картриджа — от 350 ₽' },
      ],
      priceLabel: 'Диагностика',
      priceVal: 'Бесплатно',
    },
  },
  {
    id: 'slide-2',
    theme: 'slide2',
    badge: 'Быстро и качественно',
    title: <>Заправка<br />картриджей<br /><em>от 350 ₽</em></>,
    desc: 'Лазерные и струйные картриджи. Совместимый тонер или оригинальный. Восстановление барабана. Готово за 1–2 часа.',
    btnPrimary: { label: 'Заказать заправку', icon: <PhoneIcon /> },
    btnOutline: { label: 'Все картриджи →', href: '/zapravka' },
    stats: [
      { num: '500+', label: 'Моделей картриджей' },
      { num: '1–2 ч', label: 'Время заправки' },
      { num: 'от 350 ₽', label: 'Стоимость' },
    ],
    card: {
      floatTL: { icon: '🟢', iconBg: '#DCFCE7', title: 'Картридж готов', sub: 'Canon 725 — заправлен' },
      floatBR: { icon: '♻️', iconBg: '#DCFCE7', title: 'Восстановление', sub: 'Барабан + тонер' },
      icon: <CartridgeIcon />,
      title: 'Заправка картриджей',
      items: [
        { text: 'Canon 725 / 726 — 400 ₽' },
        { text: 'HP 85A / 36A — 450 ₽' },
        { text: 'Xerox 3020 — 500 ₽' },
        { text: 'Samsung MLT-D101 — 400 ₽' },
      ],
      priceLabel: 'Стоимость от',
      priceVal: '350 ₽',
    },
  },
  {
    id: 'slide-3',
    theme: 'slide3',
    badge: 'Новое направление',
    title: <>Создаём сайты<br />которые <em>продают</em></>,
    desc: 'Лендинги, корпоративные сайты, интернет-магазины. Дизайн, разработка, SEO-продвижение под ключ.',
    btnPrimary: { label: 'Обсудить проект', icon: <ChatIcon />, href: '/web#zayavka' },
    btnOutline: { label: 'Посмотреть работы →', href: '/web' },
    stats: [
      { num: '14 дней', label: 'Лендинг под ключ' },
      { num: 'от 25 000 ₽', label: 'Стоимость' },
      { num: 'SEO', label: 'В комплекте' },
    ],
    card: {
      floatTL: { icon: '🚀', iconBg: '#F3E8FF', title: 'Сайт запущен', sub: 'remito-client.ru' },
      floatBR: { icon: '📈', iconBg: '#F3E8FF', title: 'Трафик +340%', sub: 'За 3 месяца SEO' },
      icon: <WebIcon />,
      title: 'Разработка сайтов',
      items: [
        { text: 'Лендинг — от 25 000 ₽' },
        { text: 'Корпоративный сайт — от 60 000 ₽' },
        { text: 'Интернет-магазин — от 90 000 ₽' },
        { text: 'SEO-продвижение — от 8 000 ₽/мес' },
      ],
      priceLabel: 'Консультация',
      priceVal: 'Бесплатно',
    },
  },
];