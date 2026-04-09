export function Reviews() {
	return (
		<section className='reviews'>
			<div className='container'>
				<div className='reviews__head'>
					<div className='reviews__head-left'>
						<span className='section-tag'>Отзывы клиентов</span>
						<h2 className='section-title'>
							Нам доверяют
							<br />
							<span>сотни клиентов</span>
						</h2>
						<p className='section-desc'>
							Реальные отзывы с Яндекс.Карт, 2GIS и Google. Мы не редактируем — только благодарим.
						</p>
					</div>
					<div className='reviews__rating-block'>
						<span className='reviews__rating-num'>
							4.9<em>/5</em>
						</span>
						<div className='reviews__stars'>
							<svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
								<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
							</svg>
							<svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
								<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
							</svg>
							<svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
								<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
							</svg>
							<svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
								<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
							</svg>
							<svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor' opacity='.4'>
								<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
							</svg>
						</div>
						<span className='reviews__rating-label'>На основе 214 отзывов</span>
					</div>
				</div>

				<div className='swiper reviews-swiper'>
					<div className='swiper-wrapper'>
						<div className='swiper-slide'>
							<div className='review-card'>
								<span className='review-card__quote'>"</span>
								<div className='review-card__head'>
									<div className='review-card__avatar' style='background: linear-gradient(135deg,#3A86FF,#2563EB);'>
										А
									</div>
									<div className='review-card__meta'>
										<span className='review-card__name'>Андрей Власов</span>
										<span className='review-card__source'>
											Яндекс.Карты
											<span className='review-card__source-dot'></span>
											Проверено
										</span>
									</div>
									<div className='review-card__stars'>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
									</div>
								</div>
								<p className='review-card__text'>
									Сломался принтер Canon в самый неподходящий момент — перед сдачей отчётов. Позвонил в Remito, мастер
									приехал через 40 минут. Диагностика бесплатно, починили за 2 часа прямо на месте. Цена адекватная, всё
									объяснили.
								</p>
								<span className='review-card__service'>🖨 Ремонт принтера Canon</span>
								<span className='review-card__date'>12 февраля 2025</span>
							</div>
						</div>

						<div className='swiper-slide'>
							<div className='review-card'>
								<span className='review-card__quote'>"</span>
								<div className='review-card__head'>
									<div className='review-card__avatar' style='background: linear-gradient(135deg,#22C55E,#16A34A);'>
										М
									</div>
									<div className='review-card__meta'>
										<span className='review-card__name'>Марина Соколова</span>
										<span className='review-card__source'>
											2GIS
											<span className='review-card__source-dot'></span>
											Проверено
										</span>
									</div>
									<div className='review-card__stars'>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
									</div>
								</div>
								<p className='review-card__text'>
									Заправляю картриджи здесь уже второй год. Всегда быстро, качество печати отличное. Один раз картридж
									потёк после заправки — позвонила, приехали и переделали бесплатно. Это и есть настоящая гарантия!
								</p>
								<span className='review-card__service'>🖨 Заправка картриджа HP</span>
								<span className='review-card__date'>3 марта 2025</span>
							</div>
						</div>

						<div className='swiper-slide'>
							<div className='review-card'>
								<span className='review-card__quote'>"</span>
								<div className='review-card__head'>
									<div className='review-card__avatar' style='background: linear-gradient(135deg,#F97316,#EA6C0A);'>
										Д
									</div>
									<div className='review-card__meta'>
										<span className='review-card__name'>Дмитрий Карпов</span>
										<span className='review-card__source'>
											Google Maps
											<span className='review-card__source-dot'></span>
											Проверено
										</span>
									</div>
									<div className='review-card__stars'>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
									</div>
								</div>
								<p className='review-card__text'>
									Ноутбук упал, перестал включаться. Думал — всё. Ребята сделали диагностику прямо при мне, объяснили
									что сломалось, назвали цену сразу. Починили за день, данные все сохранили. Рекомендую без сомнений.
								</p>
								<span className='review-card__service'>💻 Ремонт ноутбука</span>
								<span className='review-card__date'>18 января 2025</span>
							</div>
						</div>

						<div className='swiper-slide'>
							<div className='review-card'>
								<span className='review-card__quote'>"</span>
								<div className='review-card__head'>
									<div className='review-card__avatar' style='background: linear-gradient(135deg,#8B5CF6,#7C3AED);'>
										Е
									</div>
									<div className='review-card__meta'>
										<span className='review-card__name'>Елена Жукова</span>
										<span className='review-card__source'>
											Яндекс.Карты
											<span className='review-card__source-dot'></span>
											Проверено
										</span>
									</div>
									<div className='review-card__stars'>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor' opacity='.35'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
									</div>
								</div>
								<p className='review-card__text'>
									МФУ Xerox перестал сканировать. Вызвала мастера, приехал точно в оговорённое время — это уже приятно.
									Быстро нашёл проблему, заменил деталь. Теперь работает как новый. Спасибо за профессионализм!
								</p>
								<span className='review-card__service'>🖨 Ремонт МФУ Xerox</span>
								<span className='review-card__date'>27 февраля 2025</span>
							</div>
						</div>

						<div className='swiper-slide'>
							<div className='review-card'>
								<span className='review-card__quote'>"</span>
								<div className='review-card__head'>
									<div className='review-card__avatar' style='background: linear-gradient(135deg,#EC4899,#DB2777);'>
										О
									</div>
									<div className='review-card__meta'>
										<span className='review-card__name'>Ольга Романова</span>
										<span className='review-card__source'>
											2GIS
											<span className='review-card__source-dot'></span>
											Проверено
										</span>
									</div>
									<div className='review-card__stars'>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
									</div>
								</div>
								<p className='review-card__text'>
									Обслуживаем оргтехнику всего офиса через Remito уже полтора года. Очень удобно — один звонок и всё
									решается. Заключили договор на обслуживание, теперь картриджи сами привозят и меняют. Рекомендую для
									бизнеса.
								</p>
								<span className='review-card__service'>📋 Обслуживание офиса</span>
								<span className='review-card__date'>5 марта 2025</span>
							</div>
						</div>

						<div className='swiper-slide'>
							<div className='review-card'>
								<span className='review-card__quote'>"</span>
								<div className='review-card__head'>
									<div className='review-card__avatar' style='background: linear-gradient(135deg,#14B8A6,#0D9488);'>
										С
									</div>
									<div className='review-card__meta'>
										<span className='review-card__name'>Сергей Николаев</span>
										<span className='review-card__source'>
											Google Maps
											<span className='review-card__source-dot'></span>
											Проверено
										</span>
									</div>
									<div className='review-card__stars'>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
										<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
											<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
										</svg>
									</div>
								</div>
								<p className='review-card__text'>
									Компьютер начал жутко тормозить. Мастер почистил от пыли, поменял термопасту и заменил HDD на SSD.
									Разница — небо и земля, загружается за 10 секунд. Всё сделали аккуратно, без лишних вопросов и советов
									купить новый.
								</p>
								<span className='review-card__service'>🖥 Ремонт компьютера</span>
								<span className='review-card__date'>20 января 2025</span>
							</div>
						</div>
					</div>
				</div>

				<div className='reviews__controls'>
					<div className='reviews__nav'>
						<button className='reviews__nav-btn' id='reviewsPrev' aria-label='Предыдущий'>
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
								<polyline points='15 18 9 12 15 6' />
							</svg>
						</button>
						<button className='reviews__nav-btn' id='reviewsNext' aria-label='Следующий'>
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
								<polyline points='9 18 15 12 9 6' />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
