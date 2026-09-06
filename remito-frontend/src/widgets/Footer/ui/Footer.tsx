'use client'

import { CONTACTS, LEGAL, REQUISITES } from '@/entities/legal'
import { Icon2Gis, IconPhone, IconSend, IconTelegram, IconVk, IconWasap } from '@/shared/ui/Icons'
import { WEB_NAV } from '@/widgets/Header/model/header-nav'
import { usePathname } from 'next/navigation'
import { WebFooter } from './WebFooter'
import './Footer.scss'

function RepairFooter() {
	return (
		<footer className='footer'>
			<div className='footer__glow footer__glow--1' />
			<div className='footer__glow footer__glow--2' />

			<div className='container'>
				<div className='footer__cta'>
					<div className='footer__cta-inner'>
						<div className='footer__cta-text'>
							<h3 className='footer__cta-title'>
								Техника сломалась? <em>Звоните прямо сейчас</em>
							</h3>
							<p className='footer__cta-sub'>Диагностика бесплатно · Работаем без выходных · Ответим за 15 минут</p>
						</div>
						<div className='footer__cta-actions'>
							<a href={`tel:${CONTACTS.phoneRaw}`} className='btn-phone-footer'>
								<IconPhone size={15} />
								{CONTACTS.phone}
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
								<img src='/img/logo.svg' alt='' />
							</div>
							<div className='footer__logo-text'>
								<span className='footer__logo-name'>
									Remi<span>to</span>
								</span>
								<span className='footer__logo-slogan'>Ремонт оргтехники</span>
							</div>
						</a>

						<p className='footer__brand-desc'>
							Профессиональный ремонт принтеров, МФУ, ноутбуков и компьютеров. Работаем с 2016 года. Гарантия на все виды
							работ.
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
							<a href={CONTACTS.vk} className='footer__social' aria-label='ВКонтакте' target='_blank' rel='noopener noreferrer'>
								<IconVk stroke={1} />
							</a>
							<a href={CONTACTS.telegram} className='footer__social' aria-label='Telegram' target='_blank' rel='noopener noreferrer'>
								<IconTelegram stroke={1} size={16} />
							</a>
							<a href={CONTACTS.whatsapp} className='footer__social' aria-label='WhatsApp' target='_blank' rel='noopener noreferrer'>
								<IconWasap stroke={1} size={16} />
							</a>
							<a href={CONTACTS.gis2} className='footer__social' aria-label='2GIS' target='_blank' rel='noopener noreferrer'>
								<Icon2Gis />
							</a>
						</div>
					</div>

					<div className='footer__nav'>
						<div className='footer__nav-col'>
							<span className='footer__nav-title'>Услуги</span>
							<a href='/uslugi/remont-printerov/' className='footer__nav-link'>
								Ремонт принтеров
							</a>
							<a href='/uslugi/zapravka-kartridzhey/' className='footer__nav-link'>
								Заправка картриджей
							</a>
							<a href='/uslugi/remont-noutbukov/' className='footer__nav-link'>
								Ремонт ноутбуков
							</a>
							<a href='/uslugi/remont-kompyuterov/' className='footer__nav-link'>
								Ремонт компьютеров
							</a>
							<a href='/uslugi/' className='footer__nav-link'>
								Все услуги →
							</a>
						</div>

						<div className='footer__nav-col'>
							<span className='footer__nav-title'>Компания</span>
							<a href='/o-kompanii/' className='footer__nav-link'>
								О компании
							</a>
							<a href='/ceny/' className='footer__nav-link'>
								Цены на услуги
							</a>
							<a href='/blog/' className='footer__nav-link'>
								Блог
							</a>
							<a href='/kontakty/' className='footer__nav-link'>
								Контакты
							</a>
							<a href={WEB_NAV.home} className='footer__nav-link'>
								Создание сайтов
								<span className='footer__nav-link-badge'>NEW</span>
							</a>
						</div>

						<div className='footer__nav-col'>
							<span className='footer__nav-title'>Контакты</span>

							<div className='footer__contact-item'>
								<span className='footer__contact-label'>Телефон</span>
								<a href={`tel:${CONTACTS.phoneRaw}`} className='footer__contact-val footer__contact-val--phone'>
									{CONTACTS.phone}
								</a>
								<span className='footer__hours'>Пн–Вс, 9:00–21:00</span>
							</div>

							<div className='footer__contact-item'>
								<span className='footer__contact-label'>Email</span>
								<a href={`mailto:${CONTACTS.email}`} className='footer__contact-val'>
									{CONTACTS.email}
								</a>
							</div>

							<div className='footer__contact-item'>
								<span className='footer__contact-label'>Telegram</span>
								<a href={CONTACTS.telegram} className='footer__contact-val' target='_blank' rel='noopener noreferrer'>
									@remito_official
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className='footer__bottom'>
					<p className='footer__copy'>
						© 2016–{new Date().getFullYear()} {LEGAL.siteName}. Все права защищены.
						<br />
						ИП Половников А.В. · ИНН {REQUISITES.inn}
					</p>

					<div className='footer__bottom-links'>
						<a href='/privacy/' className='footer__bottom-link'>
							Политика конфиденциальности
						</a>
						<span className='footer__bottom-sep' />
						<a href='/oferta/' className='footer__bottom-link'>
							Оферта
						</a>
						<span className='footer__bottom-sep' />
						<a href='/terms/' className='footer__bottom-link'>
							Условия сайта
						</a>
						<span className='footer__bottom-sep' />
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
						Сайт сделан в <a href={WEB_NAV.home}>Remito Web</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export function Footer() {
	const pathname = usePathname()
	const isWeb = pathname?.startsWith('/web')

	return isWeb ? <WebFooter /> : <RepairFooter />
}
