'use client'

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
}

export const FormPopup = ({ isOpen, onClose }: FormPopupProps) => {
	const [isSuccess, setIsSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [phoneError, setPhoneError] = useState(false)
	const [form, setForm] = useState<FormData>({
		name: '',
		phone: '',
		service: '',
		comment: '',
		agreement: true
	})

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
			setTimeout(() => {
				setIsSuccess(false)
				setPhoneError(false)
				setForm({ name: '', phone: '', service: '', comment: '', agreement: true })
			}, 300)
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target
		setForm(prev => ({
			...prev,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
		}))
		if (name === 'phone') setPhoneError(false)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!form.phone.trim()) {
			setPhoneError(true)
			return
		}
		setIsLoading(true)
		// TODO: заменить на реальный API вызов
		await new Promise(r => setTimeout(r, 1200))
		setIsLoading(false)
		setIsSuccess(true)
	}

	const handleClose = () => {
		setIsSuccess(false)
		onClose()
	}

	if (!isOpen) return null

	return (
		<>
			{/* ── ФОРМА ── */}
			{!isSuccess && (
				<div className={styles.overlay} aria-modal='true' role='dialog' aria-label='Оставить заявку'>
					<div className={styles.overlayBg} onClick={handleClose} />
					<div className={styles.popup}>
						{/* Header */}
						<div className={styles.header}>
							<div className={`${styles.headerGlow} ${styles.headerGlow1}`} />
							<div className={`${styles.headerGlow} ${styles.headerGlow2}`} />
							<div className={styles.headerGrid} />

							<button className={styles.close} onClick={handleClose} aria-label='Закрыть' type='button'>
								<IconClose />
							</button>

							<div className={styles.headerContent}>
								<span className={styles.tag}>Бесплатная консультация</span>
								<h2 className={styles.title}>
									Вызвать мастера
									<br />
									<em>прямо сейчас</em>
								</h2>
								<p className={styles.subtitle}>Заполните форму — перезвоним за 15 минут</p>
								<div className={styles.perks}>
									<span className={styles.perk}>
										<IconLightning /> Выезд за 1 час
									</span>
									<span className={styles.perk}>
										<IconShield /> Гарантия 90 дней
									</span>
									<span className={styles.perk}>
										<IconInfo /> Диагностика бесплатно
									</span>
								</div>
							</div>
						</div>

						{/* Body */}
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
										<input
											className={styles.input}
											type='tel'
											id='pp-phone'
											name='phone'
											placeholder='+7 (000) 000-00-00'
											autoComplete='tel'
											value={form.phone}
											onChange={handleChange}
										/>
										{phoneError && <span className={styles.errorMsg}>Укажите номер телефона</span>}
									</div>

									<div className={`${styles.formGroup} ${styles.formGroupFull}`}>
										<label className={styles.label} htmlFor='pp-service'>
											Тип услуги
										</label>
										<select
											className={styles.select}
											id='pp-service'
											name='service'
											value={form.service}
											onChange={handleChange}
										>
											<option value='' disabled>
												Выберите услугу
											</option>
											<option value='Ремонт принтера / МФУ'>Ремонт принтера / МФУ</option>
											<option value='Заправка картриджа'>Заправка картриджа</option>
											<option value='Ремонт ноутбука'>Ремонт ноутбука</option>
											<option value='Ремонт компьютера'>Ремонт компьютера</option>
											<option value='Покупка картриджа'>Покупка картриджа</option>
											<option value='Другое'>Другое</option>
										</select>
									</div>

									<div className={`${styles.formGroup} ${styles.formGroupFull}`}>
										<label className={styles.label} htmlFor='pp-comment'>
											Модель / комментарий
										</label>
										<input
											className={styles.input}
											type='text'
											id='pp-comment'
											name='comment'
											placeholder='Например: Canon MF3010 — не печатает'
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
										Соглашаюсь с <Link href='/privacy/'>политикой конфиденциальности</Link>
									</span>
								</label>

								<button className={styles.submit} type='submit' disabled={isLoading}>
									{isLoading ? (
										<span className={styles.submitSpin} aria-hidden='true'>
											<IconSpinner />
										</span>
									) : (
										<span className={styles.submitText}>
											<IconSend /> Отправить заявку
										</span>
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			)}

			{/* ── SUCCESS ── */}
			{isSuccess && (
				<div className={styles.overlay} aria-modal='true' role='dialog' aria-label='Заявка отправлена'>
					<div className={styles.overlayBg} onClick={handleClose} />
					<div className={styles.success}>
						<button className={styles.successX} onClick={handleClose} aria-label='Закрыть' type='button'>
							<IconClose />
						</button>

						<div className={styles.successTop}>
							<div className={styles.successGlow} />
							<div className={styles.successGrid} />
							<div className={styles.successIconWrap}>
								<div className={styles.successIcon}>
									<IconCheck size={34} />
								</div>
							</div>
							<h2 className={styles.successTitle}>Заявка отправлена!</h2>
							<p className={styles.successSub}>
								Спасибо, что обратились к нам.
								<br />
								Мы уже получили вашу заявку.
							</p>
						</div>

						<div className={styles.successBody}>
							<div className={styles.successInfo}>
								<div className={styles.successInfoRow}>
									<div className={styles.successInfoIcon} style={{ background: '#EEF4FF', color: '#3A86FF' }}>
										<IconClock />
									</div>
									<div className={styles.successInfoText}>
										<span className={styles.successInfoLabel}>Ответим через</span>
										<span className={styles.successInfoVal}>15 минут</span>
									</div>
								</div>
								<div className={styles.successInfoRow}>
									<div className={styles.successInfoIcon} style={{ background: '#F0FDF4', color: '#22C55E' }}>
										<IconPhone />
									</div>
									<div className={styles.successInfoText}>
										<span className={styles.successInfoLabel}>Или позвоните</span>
										<span className={styles.successInfoVal}>+7 (343) 123-45-67</span>
									</div>
								</div>
								<div className={styles.successInfoRow}>
									<div className={styles.successInfoIcon} style={{ background: '#FFF7ED', color: '#F97316' }}>
										<IconShield size={16} />
									</div>
									<div className={styles.successInfoText}>
										<span className={styles.successInfoLabel}>Выезд мастера</span>
										<span className={styles.successInfoVal}>В течение 1 часа</span>
									</div>
								</div>
							</div>

							<button className={styles.successClose} onClick={handleClose} type='button'>
								<IconClose /> Закрыть
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
