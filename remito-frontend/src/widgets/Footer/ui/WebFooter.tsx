import { CONTACTS, LEGAL, REQUISITES } from '@/entities/legal'
import { WEB_NAV, WEB_SERVICE_LINKS } from '@/widgets/Header/model/header-nav'
import { IconPhone, IconSend } from '@/shared/ui/Icons'
import './Footer.scss'

export function WebFooter() {
	return (
		<footer className='footer footer--web'>
			<div className='footer__glow footer__glow--1' />
			<div className='footer__glow footer__glow--2' />

			<div className='container'>
				<div className='footer__cta'>
					<div className='footer__cta-inner'>
						<div className='footer__cta-text'>
							<h3 className='footer__cta-title'>
								Нужен сайт? <em>Обсудим задачу</em>
							</h3>
							<p className='footer__cta-sub'>Смета и сроки — после короткого брифа. Без навязчивых продаж.</p>
						</div>
						<div className='footer__cta-actions'>
							<a href={`tel:${CONTACTS.phoneRaw}`} className='btn-phone-footer'>
								<IconPhone size={15} />
								{CONTACTS.phone}
							</a>
							<a href='#zayavka' className='btn-cta-footer btn-cta-footer--web'>
								<IconSend size={17} />
								Оставить заявку
							</a>
						</div>
					</div>
				</div>

				<div className='footer__main'>
					<div className='footer__brand'>
						<a href={WEB_NAV.home} className='footer__logo'>
							<div className='footer__logo-icon'>
								<img src='/img/logo.svg' alt='' />
							</div>
							<div className='footer__logo-text'>
								<span className='footer__logo-name'>
									Remi<span>to</span> <span className='footer__logo-web'>Web</span>
								</span>
								<span className='footer__logo-slogan'>Разработка сайтов</span>
							</div>
						</a>

						<p className='footer__brand-desc'>
							Лендинги, сайты-визитки, корпоративные проекты и интернет-магазины на Next.js. Направление веб-разработки
							сервиса Remito, Екатеринбург.
						</p>

						<a href='/' className='footer__back-link'>
							← Ремонт оргтехники на главной
						</a>
					</div>

					<div className='footer__nav'>
						<div className='footer__nav-col'>
							<span className='footer__nav-title'>Услуги</span>
							{WEB_SERVICE_LINKS.map(item => (
								<a key={item.href} href={item.href} className='footer__nav-link'>
									{item.label}
								</a>
							))}
							<a href={WEB_NAV.pricing} className='footer__nav-link'>
								Тарифы и цены
							</a>
						</div>

						<div className='footer__nav-col'>
							<span className='footer__nav-title'>Remito</span>
							<a href='/o-kompanii/' className='footer__nav-link'>
								О компании
							</a>
							<a href='/kontakty/' className='footer__nav-link'>
								Контакты
							</a>
							<a href='/blog/' className='footer__nav-link'>
								Блог
							</a>
							<a href='/uslugi/' className='footer__nav-link'>
								Ремонт техники
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
					</div>
				</div>
			</div>
		</footer>
	)
}
