import { Icon2Gis, IconPhone, IconSend, IconTelegram, IconVk, IconWasap } from '@/shared/ui/Icons'
import './Footer.scss'

export function Footer() {
	return (
		<footer className='footer'>
			<div className='footer__glow footer__glow--1'></div>
			<div className='footer__glow footer__glow--2'></div>

			<div className='container'>
				<div className='footer__cta'>
					<div className='footer__cta-inner'>
						<div className='footer__cta-text'>
							<h3 className='footer__cta-title'>
								Техника сломалась? <em>Звоните прямо сейчас</em>
							</h3>
							<p className='footer__cta-sub'>Выезд за 1 час · Диагностика бесплатно · Работаем без выходных</p>
						</div>
						<div className='footer__cta-actions'>
							<a href='tel:+73431234567' className='btn-phone-footer'>
								<IconPhone size={15} />
								+7 (343) 123-45-67
							</a>
							<a href='#zayavka' className='btn-cta-footer'>
								<IconSend size={17} />
								Оставить заявку
							</a>
						</div>
					</div>
				</div>

				<div className='footer__main'>
					<div className='footer__brand'>
						<a href='/' className='footer__logo'>
							<div className='footer__logo-icon'>
								<img src="/img/logo.svg" />
							</div>
							<div className='footer__logo-text'>
								<span className='footer__logo-name'>
									Remi<span>to</span>
								</span>
								<span className='footer__logo-slogan'>Ремонт оргтехники</span>
							</div>
						</a>

						<p className='footer__brand-desc'>
							Профессиональный ремонт принтеров, МФУ, ноутбуков и компьютеров в Екатеринбурге. Работаем с 2016 года.
							Гарантия на все виды работ.
						</p>

						<div className='footer__rating'>
							<div className='footer__rating-stars'>
								<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
									<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
								</svg>
								<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
									<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
								</svg>
								<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
									<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
								</svg>
								<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
									<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
								</svg>
								<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor' opacity='.35'>
									<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
								</svg>
							</div>
							<span className='footer__rating-text'>
								<strong>4.9</strong> · 214 отзывов
							</span>
						</div>

						<div className='footer__socials'>
							<a href='#' className='footer__social' aria-label='ВКонтакте'>
								<IconVk stroke={1} />
							</a>
							<a href='#' className='footer__social' aria-label='Telegram'>
								<IconTelegram stroke={1} size={16} />
							</a>
							<a href='#' className='footer__social' aria-label='WhatsApp'>
								<IconWasap stroke={1} size={16} />
							</a>
							<a href='#' className='footer__social' aria-label='2GIS'>
								<Icon2Gis />
							</a>
						</div>
					</div>

					<div className='footer__nav'>
						<div className='footer__nav-col'>
							<span className='footer__nav-title'>Услуги</span>
							<a href='/remont/printer' className='footer__nav-link'>
								Ремонт принтеров
							</a>
							<a href='/remont/mfu' className='footer__nav-link'>
								Ремонт МФУ
							</a>
							<a href='/zapravka' className='footer__nav-link'>
								Заправка картриджей
							</a>
							<a href='/remont/noutbuk' className='footer__nav-link'>
								Ремонт ноутбуков
							</a>
							<a href='/remont/kompyuter' className='footer__nav-link'>
								Ремонт компьютеров
							</a>
							<a href='/dogovor' className='footer__nav-link'>
								Обслуживание офисов
							</a>
						</div>

						<div className='footer__nav-col'>
							<span className='footer__nav-title'>Бренды</span>
							<a href='/brendy/canon' className='footer__nav-link'>
								Canon
							</a>
							<a href='/brendy/hp' className='footer__nav-link'>
								HP
							</a>
							<a href='/brendy/xerox' className='footer__nav-link'>
								Xerox
							</a>
							<a href='/brendy/samsung' className='footer__nav-link'>
								Samsung
							</a>
							<a href='/brendy/epson' className='footer__nav-link'>
								Epson
							</a>
							<a href='/brendy' className='footer__nav-link'>
								Все бренды →
							</a>
						</div>

						<div className='footer__nav-col'>
							<span className='footer__nav-title'>Компания</span>
							<a href='/o-nas' className='footer__nav-link'>
								О нас
							</a>
							<a href='/ceny' className='footer__nav-link'>
								Цены на услуги
							</a>
							<a href='/otzyvy' className='footer__nav-link'>
								Отзывы
							</a>
							<a href='/blog' className='footer__nav-link'>
								Блог
							</a>
							<a href='/kontakty' className='footer__nav-link'>
								Контакты
							</a>
							<a href='/web' className='footer__nav-link'>
								Создание сайтов
								<span className='footer__nav-link-badge'>NEW</span>
							</a>
						</div>

						<div className='footer__nav-col'>
							<span className='footer__nav-title'>Контакты</span>

							<div className='footer__contact-item'>
								<span className='footer__contact-label'>Телефон</span>
								<a href='tel:+73431234567' className='footer__contact-val footer__contact-val--phone'>
									+7 (343) 123-45-67
								</a>
								<span className='footer__hours'>Пн–Вс, 9:00–21:00</span>
							</div>

							<div className='footer__contact-item'>
								<span className='footer__contact-label'>Email</span>
								<a href='mailto:info@remito.ru' className='footer__contact-val'>
									info@remito.ru
								</a>
							</div>

							<div className='footer__contact-item'>
								<span className='footer__contact-label'>Адрес</span>
								<span className='footer__contact-val'>
									Екатеринбург,
									<br />
									ул. Ленина, 1
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='footer__bottom'>
					<p className='footer__copy'>
						© 2016–2025 Remito. Все права защищены.
						<br />
						ИП Иванов И.И. · ИНН 000000000000
					</p>

					<div className='footer__bottom-links'>
						<a href='/privacy' className='footer__bottom-link'>
							Политика конфиденциальности
						</a>
						<span className='footer__bottom-sep'></span>
						<a href='/oferta' className='footer__bottom-link'>
							Публичная
						</a>
						<span className='footer__bottom-sep'></span>
						<a href='/sitemap.xml' className='footer__bottom-link'>
							Карта сайта
						</a>
					</div>

					<div className='footer__made'>
						<svg
							width='13'
							height='13'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							opacity='.5'
						>
							<rect x='3' y='3' width='18' height='18' rx='2' />
							<path d='M3 9h18M9 21V9' />
						</svg>
						Сайт сделан в <a href='/web'>Remito Web</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
