'use client'

import { useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import { heroSlides } from '../model/heroSlides'
import styles from './Hero.module.scss'
import { HeroControls } from './HeroControls/HeroControls'
import { HeroSlide } from './HeroSlide/HeroSlide'

export const Hero = () => {
	const swiperRef = useRef<SwiperType | null>(null)
	const progressBarRef = useRef<HTMLDivElement>(null)

	const handlePrev = () => swiperRef.current?.slidePrev()
	const handleNext = () => swiperRef.current?.slideNext()

	const updateProgress = (swiper: SwiperType) => {
		if (!progressBarRef.current) return
		const progress = (swiper.realIndex + 1) / swiper.slides.length
		progressBarRef.current.style.width = `${progress * 100}%`
	}

	return (
		<section className={styles.hero}>
			<Swiper
				className={styles.swiper}
				modules={[Autoplay, Pagination]}
				pagination={{ clickable: true, el: `.${styles.pagination}` }}
				autoplay={{ delay: 6000, disableOnInteraction: false }}
				loop
				speed={600}
				onSwiper={swiper => {
					swiperRef.current = swiper
					updateProgress(swiper)
				}}
				onSlideChange={swiper => updateProgress(swiper)}
			>
				{heroSlides.map(slide => (
					<SwiperSlide key={slide.id}>
						<HeroSlide data={slide} />
					</SwiperSlide>
				))}

				<div className={styles.pagination} />
			</Swiper>

			<HeroControls onPrev={handlePrev} onNext={handleNext} progressRef={progressBarRef} />
		</section>
	)
}
