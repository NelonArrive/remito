'use client'

import { CONTACTS } from '@/entities/legal'
import { formatPhoneDisplay, isValidRussianPhone, PHONE_ERROR_MESSAGE } from '@/shared/lib/phone'
import { sendFormToTelegram } from '@/shared/lib/telegram'
import { PhoneInput } from '@/shared/ui/PhoneInput'
import { WEB_SERVICES } from '@/entities/web-service'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
	IconCheck,
	IconClock,
	IconClose,
	IconInfo,
	IconLightning,
	IconPhone,
	IconSend,
	IconShield,
	IconSpinner
} from '../Icons'
import styles from './FormPopup.module.scss'

export type FormPopupVariant = 'repair' | 'web'

interface FormData {
	name: string
	phone: string
	service: string
	comment: string
	agreement: boolean
}

interface FormPopupProps {
	isOpen: boolean
	onClose: () => void
	variant?: FormPopupVariant
}

const REPAIR_SERVICES = [
	'Ремонт принтера / МФУ',
	'Заправка картриджа',
	'Ремонт ноутбука',
	'Ремонт компьютера',
	'Покупка картриджа',
	'Другое'
]

export const FormPopup = ({ isOpen, onClose, variant = 'repair' }: FormPopupProps) => {
	const isWeb = variant === 'web'
	const [mounted, setMounted] = useState(false)
	const [visible, setVisible] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [phoneError, setPhoneError] = useState('')
	const [submitError, setSubmitError] = useState('')
	const [form, setForm] = useState<FormData>({
		name: '',
		phone: '',
		service: '',
		comment: '',
		agreement: true
	})

	useEffect(() => {
		if (isOpen) {
			setMounted(true)
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setVisible(true))
			})
			document.body.classList.add('popup-open')
			return
		}

		setVisible(false)
		const timer = window.setTimeout(() => {
			setMounted(false)
			setIsSuccess(false)
			setPhoneError('')
			setSubmitError('')
			setForm({ name: '', phone: '', service: '', comment: '', agreement: true })
		}, 380)

		document.body.classList.remove('popup-open')

		return () => window.clearTimeout(timer)
	}, [isOpen])

	useEffect(() => {
		return () => {
			document.body.classList.remove('popup-open')
		}
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target
		setForm(prev => ({
			...prev,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
		}))
		if (name === 'phone') setPhoneError('')
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!form.phone.trim()) {
			setPhoneError('Укажите номер телефона')
			return
		}
		if (!isValidRussianPhone(form.phone)) {
			setPhoneError(PHONE_ERROR_MESSAGE)
			return
		}
		setIsLoading(true)
		setSubmitError('')
		try {
			await sendFormToTelegram({
				name: form.name,
				phone: formatPhoneDisplay(form.phone),
				service: form.service,
				comment: form.comment,
				source: isWeb ? 'Remito Web — попап' : 'Remito — попап'
			})
			setIsSuccess(true)
		} catch (error) {
			setSubmitError(error instanceof Error ? error.message : 'Не удалось отправить заявку')
		} finally {
			setIsLoading(false)
		}
	}

	const handleClose = () => {
		onClose()
	}

	if (!mounted) return null

	return (
		<div
			className={`${styles.overlay} ${visible ? styles.overlayOpen : ''} ${isWeb ? styles.overlayWeb : ''}`}
			aria-modal='true'
			role='dialog'
			aria-label={isSuccess ? 'Заявка отправлена' : isWeb ? 'Обсудить проект' : 'Оставить заявку'}
		>
			<div className={styles.overlayBg} onClick={handleClose} aria-hidden />

			{!isSuccess ? (
				<div className={`${styles.popup} ${visible ? styles.popupOpen : ''}`}>
					<div className={`${styles.header} ${isWeb ? styles.headerWeb : ''}`}>
						<div className={`${styles.headerGlow} ${styles.headerGlow1}`} />
						<div className={`${styles.headerGlow} ${styles.headerGlow2}`} />
						<div className={styles.headerGrid} />

						<button className={styles.close} onClick={handleClose} aria-label='Закрыть' type='button'>
							<IconClose />
						</button>

						<div className={styles.headerContent}>
							<span className={styles.tag}>{isWeb ? 'Remito Web' : 'Бесплатная консультация'}</span>
							<h2 className={styles.title}>
								{isWeb ? (
									<>
										Обсудить <em>проект</em>
									</>
								) : (
									<>
										Вызвать мастера
										<br />
										<em>прямо сейчас</em>
									</>
								)}
							</h2>
							<p className={styles.subtitle}>
								{isWeb
									? 'Расскажите о задаче — посчитаем сроки и бюджет в течение рабочего дня'
									: 'Заполните форму — перезвоним за 15 минут'}
							</p>
							<div className={styles.perks}>
								{isWeb ? (
									<>
										<span className={styles.perk}>
											<IconLightning /> Next.js · быстро
										</span>
										<span className={styles.perk}>
											<IconInfo /> SEO из коробки
										</span>
										<span className={styles.perk}>
											<IconShield /> Смета без давления
										</span>
									</>
								) : (
									<>
										<span className={styles.perk}>
											<IconLightning /> Выезд в удобное время
										</span>
										<span className={styles.perk}>
											<IconShield /> Гарантия на работы
										</span>
										<span className={styles.perk}>
											<IconInfo /> Диагностика бесплатно
										</span>
									</>
								)}
							</div>
						</div>
					</div>

					<div className={styles.body}>
						<form className={styles.form} onSubmit={handleSubmit} noValidate>
							<div className={styles.formGrid}>
								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor='pp-name'>
										Ваше имя
									</label>
									<input
										className={styles.input}
										type='text'
										id='pp-name'
										name='name'
										placeholder='Иван Петров'
										autoComplete='given-name'
										value={form.name}
										onChange={handleChange}
									/>
								</div>

								<div className={`${styles.formGroup} ${phoneError ? styles.formGroupError : ''}`}>
									<label className={styles.label} htmlFor='pp-phone'>
										Телефон *
									</label>
									<PhoneInput
										className={styles.input}
										id='pp-phone'
										name='phone'
										value={form.phone}
										hasError={!!phoneError}
										onAccept={value => {
											setForm(prev => ({ ...prev, phone: value }))
											setPhoneError('')
										}}
									/>
									{phoneError && <span className={styles.errorMsg}>{phoneError}</span>}
								</div>

								<div className={`${styles.formGroup} ${styles.formGroupFull}`}>
									<label className={styles.label} htmlFor='pp-service'>
										{isWeb ? 'Тип сайта' : 'Тип услуги'}
									</label>
									<select
										className={styles.select}
										id='pp-service'
										name='service'
										value={form.service}
										onChange={handleChange}
									>
										<option value='' disabled>
											{isWeb ? 'Выберите формат' : 'Выберите услугу'}
										</option>
										{isWeb
											? WEB_SERVICES.map(service => (
													<option key={service.id} value={service.title}>
														{service.title}
													</option>
												))
											: REPAIR_SERVICES.map(service => (
													<option key={service} value={service}>
														{service}
													</option>
												))}
									</select>
								</div>

								<div className={`${styles.formGroup} ${styles.formGroupFull}`}>
									<label className={styles.label} htmlFor='pp-comment'>
										{isWeb ? 'О проекте' : 'Модель / комментарий'}
									</label>
									<textarea
										className={`${styles.input} ${styles.textarea}`}
										id='pp-comment'
										name='comment'
										placeholder={
											isWeb
												? 'Например: лендинг для сервиса, нужен каталог и форма заявки'
												: 'Например: Canon MF3010 — не печатает'
										}
										rows={3}
										value={form.comment}
										onChange={handleChange}
									/>
								</div>
							</div>

							<label className={styles.privacy}>
								<span className={styles.checkboxWrap}>
									<input
										type='checkbox'
										name='agreement'
										id='pp-agreement'
										checked={form.agreement}
										onChange={handleChange}
									/>
									<span className={styles.checkboxBox}>
										<IconCheck />
									</span>
								</span>
								<span className={styles.privacyText}>
									Соглашаюсь с <Link href='/privacy/'>политикой конфиденциальности</Link> и{' '}
									<Link href='/oferta/'>публичной офертой</Link>
								</span>
							</label>

							{submitError && <p className={styles.errorMsg}>{submitError}</p>}

							<button className={`${styles.submit} ${isWeb ? styles.submitWeb : ''}`} type='submit' disabled={isLoading}>
								{isLoading ? (
									<span className={styles.submitSpin} aria-hidden='true'>
										<IconSpinner />
									</span>
								) : (
									<span className={styles.submitText}>
										<IconSend /> {isWeb ? 'Отправить заявку' : 'Отправить заявку'}
									</span>
								)}
							</button>
						</form>
					</div>
				</div>
			) : (
				<div className={`${styles.success} ${visible ? styles.successOpen : ''}`}>
					<button className={styles.successX} onClick={handleClose} aria-label='Закрыть' type='button'>
						<IconClose />
					</button>

					<div className={`${styles.successTop} ${isWeb ? styles.successTopWeb : ''}`}>
						<div className={styles.successGlow} />
						<div className={styles.successGrid} />
						<div className={styles.successIconWrap}>
							<div className={styles.successIcon}>
								<IconCheck size={34} />
							</div>
							<div className={styles.successRing} aria-hidden />
						</div>
						<h2 className={styles.successTitle}>Заявка отправлена!</h2>
						<p className={styles.successSub}>
							Спасибо, что обратились к нам.
							<br />
							{isWeb ? 'Свяжемся и обсудим детали проекта.' : 'Мы уже получили вашу заявку.'}
						</p>
					</div>

					<div className={styles.successBody}>
						<div className={styles.successInfo}>
							<div className={styles.successInfoRow}>
								<div className={`${styles.successInfoIcon} ${styles.successInfoIconBlue}`}>
									<IconClock />
								</div>
								<div className={styles.successInfoText}>
									<span className={styles.successInfoLabel}>Ответим через</span>
									<span className={styles.successInfoVal}>{isWeb ? 'в рабочий день' : '15 минут'}</span>
								</div>
							</div>
							<div className={styles.successInfoRow}>
								<div className={`${styles.successInfoIcon} ${styles.successInfoIconGreen}`}>
									<IconPhone />
								</div>
								<div className={styles.successInfoText}>
									<span className={styles.successInfoLabel}>Или позвоните</span>
									<a href={`tel:${CONTACTS.phoneRaw}`} className={styles.successInfoVal}>
										{CONTACTS.phone}
									</a>
								</div>
							</div>
							<div className={styles.successInfoRow}>
								<div className={`${styles.successInfoIcon} ${styles.successInfoIconOrange}`}>
									<IconShield size={16} />
								</div>
								<div className={styles.successInfoText}>
									<span className={styles.successInfoLabel}>{isWeb ? 'Консультация' : 'Выезд мастера'}</span>
									<span className={styles.successInfoVal}>{isWeb ? 'Бесплатно, 15–20 мин' : 'В удобное для вас время'}</span>
								</div>
							</div>
						</div>

						<button className={styles.successClose} onClick={handleClose} type='button'>
							<IconClose /> Закрыть
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
