import initAccordion from './modules/accordion.js'
import initAnimation from './modules/animation.js'
import initBurger from './modules/burger.js'
import initCookies from './modules/cookies.js'
import initFormSend from './modules/form-send.js'
import initSwiper from './modules/swiper.js'

document.addEventListener('DOMContentLoaded', () => {
	initAccordion()
	initFormSend()
	initBurger()
	initSwiper()
	initAnimation()
	initCookies()
})
