export function FormSend() {
	return (
		<section className='form-section' id='zayavka'>
			<div className='form-section__bg'>
				<div className='form-section__bg-grid'></div>
				<div className='form-section__bg-glow form-section__bg-glow--1'></div>
				<div className='form-section__bg-glow form-section__bg-glow--2'></div>
			</div>

			<div className='container'>
				<div className='form-section__inner'>
					<div className='form-section__left'>
						<span className='form-section__tag'>Оставить заявку</span>

						<h2 className='form-section__title'>
							Опишите проблему —<br />
							мы <em>приедем и решим</em>
						</h2>

						<p className='form-section__desc'>
							Заполните форму, и наш специалист свяжется с вами в течение 15 минут. Консультация и выезд — бесплатно.
						</p>

						<div className='form-section__guarantees'>
							<div className='form-guarantee'>
								<div className='form-guarantee__icon' style='background:rgba(58,134,255,.15); color:#60A5FA;'>
									<svg
										width='18'
										height='18'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
									</svg>
								</div>
								<div className='form-guarantee__text'>
									<span className='form-guarantee__title'>Выезд мастера за 1 час</span>
									<span className='form-guarantee__sub'>По всему Екатеринбургу, без доп. платы</span>
								</div>
							</div>

							<div className='form-guarantee'>
								<div className='form-guarantee__icon' style='background:rgba(34,197,94,.15); color:#4ADE80;'>
									<svg
										width='18'
										height='18'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
									</svg>
								</div>
								<div className='form-guarantee__text'>
									<span className='form-guarantee__title'>Диагностика бесплатно</span>
									<span className='form-guarantee__sub'>Озвучим стоимость до начала работ</span>
								</div>
							</div>

							<div className='form-guarantee'>
								<div className='form-guarantee__icon' style='background:rgba(249,115,22,.15); color:#FB923C;'>
									<svg
										width='18'
										height='18'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<circle cx='12' cy='12' r='10' />
										<polyline points='12 6 12 12 16 14' />
									</svg>
								</div>
								<div className='form-guarantee__text'>
									<span className='form-guarantee__title'>Ответим за 15 минут</span>
									<span className='form-guarantee__sub'>Работаем ежедневно с 9:00 до 21:00</span>
								</div>
							</div>

							<div className='form-guarantee'>
								<div className='form-guarantee__icon' style='background:rgba(196,130,252,.15); color:#C084FC;'>
									<svg
										width='18'
										height='18'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<line x1='12' y1='1' x2='12' y2='23' />
										<path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
									</svg>
								</div>
								<div className='form-guarantee__text'>
									<span className='form-guarantee__title'>Гарантия 90 дней</span>
									<span className='form-guarantee__sub'>На все виды выполненных работ</span>
								</div>
							</div>
						</div>

						<div className='form-section__contacts'>
							<div className='form-contact-row'>
								<svg
									width='15'
									height='15'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z' />
								</svg>
								Или позвоните: <a href='tel:+73431234567'>+7 (343) 123-45-67</a>
							</div>
							<div className='form-contact-row'>
								<svg
									width='15'
									height='15'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
									<polyline points='22,6 12,13 2,6' />
								</svg>
								Или напишите: <a href='mailto:info@ремито.рф'>info@ремито.рф</a>
							</div>
						</div>
					</div>

					<div className='form-section__right'>
						<div className='form-card'>
							<h3 className='form-card__title'>Оставить заявку</h3>
							<p className='form-card__sub'>Заполните поля — перезвоним в течение 15 минут</p>

							<div className='form-card__form' id='mainForm'>
								<div className='form-grid'>
									<div className='form-group' id='group-name'>
										<label className='form-label' htmlFor='f-name'>
											Ваше имя *
										</label>
										<input
											className='form-input'
											type='text'
											id='f-name'
											placeholder='Иван Петров'
											autoComplete='given-name'
										/>
										<span className='form-error-msg'>Укажите ваше имя</span>
									</div>

									<div className='form-group' id='group-phone'>
										<label className='form-label' htmlFor='f-phone'>
											Телефон *
										</label>
										<input
											className='form-input'
											type='tel'
											id='f-phone'
											placeholder='+7 (000) 000-00-00'
											autoComplete='tel'
										/>
										<span className='form-error-msg'>Укажите номер телефона</span>
									</div>

									<div className='form-group form-group--full' id='group-service'>
										<label className='form-label' htmlFor='f-service'>
											Тип услуги *
										</label>
										<select className='form-select' id='f-service'>
											<option value='' disabled selected>
												Выберите услугу
											</option>
											<option value='printer'>Ремонт принтера / МФУ</option>
											<option value='cartridge'>Заправка картриджа</option>
											<option value='laptop'>Ремонт ноутбука</option>
											<option value='pc'>Ремонт компьютера</option>
											<option value='buy'>Покупка картриджа</option>
											<option value='contract'>Обслуживание офиса</option>
											<option value='other'>Другое</option>
										</select>
										<span className='form-error-msg'>Выберите тип услуги</span>
									</div>

									<div className='form-group form-group--full'>
										<label className='form-label' htmlFor='f-brand'>
											Бренд / модель устройства
										</label>
										<input
											className='form-input'
											type='text'
											id='f-brand'
											placeholder='Например: Canon MF3010 или HP LaserJet'
										/>
									</div>

									<div className='form-group form-group--full'>
										<label className='form-label' htmlFor='f-comment'>
											Описание проблемы
										</label>
										<textarea
											className='form-textarea'
											id='f-comment'
											placeholder='Опишите, что случилось — это поможет мастеру подготовиться заранее'
										></textarea>
									</div>
								</div>

								<label className='form-privacy'>
									<span className='form-privacy__checkbox'>
										<input type='checkbox' id='f-privacy' checked />
										<span className='form-privacy__box'>
											<svg
												width='10'
												height='10'
												viewBox='0 0 24 24'
												fill='none'
												stroke='white'
												strokeWidth='3'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<polyline points='20 6 9 17 4 12' />
											</svg>
										</span>
									</span>
									<span className='form-privacy__text'>
										Нажимая кнопку, я соглашаюсь с<a href='/privacy'>политикой конфиденциальности</a> и даю согласие на
										обработку персональных данных
									</span>
								</label>

								<button className='btn-submit' id='submitBtn' type='button'>
									<span className='btn-submit__text'>
										<svg
											width='16'
											height='16'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											<line x1='22' y1='2' x2='11' y2='13' />
											<polygon points='22 2 15 22 11 13 2 9 22 2' />
										</svg>
										Отправить заявку
									</span>
									<span className='btn-submit__spinner'>
										<svg
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											<line x1='12' y1='2' x2='12' y2='6' />
											<line x1='12' y1='18' x2='12' y2='22' />
											<line x1='4.93' y1='4.93' x2='7.76' y2='7.76' />
											<line x1='16.24' y1='16.24' x2='19.07' y2='19.07' />
											<line x1='2' y1='12' x2='6' y2='12' />
											<line x1='18' y1='12' x2='22' y2='12' />
											<line x1='4.93' y1='19.07' x2='7.76' y2='16.24' />
											<line x1='16.24' y1='7.76' x2='19.07' y2='4.93' />
										</svg>
									</span>
								</button>
							</div>

							<div className='form-success' id='formSuccess'>
								<div className='form-success__icon'>
									<svg
										width='28'
										height='28'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<polyline points='20 6 9 17 4 12' />
									</svg>
								</div>
								<h4 className='form-success__title'>Заявка отправлена!</h4>
								<p className='form-success__text'>Наш специалист свяжется с вами в ближайшее время</p>
								<div className='form-success__time'>
									<svg
										width='14'
										height='14'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<circle cx='12' cy='12' r='10' />
										<polyline points='12 6 12 12 16 14' />
									</svg>
									Обычно перезваниваем за 15 минут
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
