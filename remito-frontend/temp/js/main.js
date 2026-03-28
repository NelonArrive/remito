/* =============================================
	 main.js  →  src/js/main.js
	 ============================================= */
import initAccordion from './modules/accordion.js'
import initAnimation from './modules/animation.js'
import initBurger from './modules/burger.js'
import initCookies from './modules/cookies.js'
import initFormSend from './modules/form-send.js'
import initPhoneMask from './modules/phone-mask.js'
import initPopup from './modules/popup.js'
import initSwiper from './modules/swiper.js'

document.addEventListener('DOMContentLoaded', () => {
	initCookies()
	const { openPopup, showThankYou } = initPopup()
	initPhoneMask()
	initFormSend(showThankYou)
	initSwiper()
	initAccordion()
	initBurger()
	initAnimation()
})