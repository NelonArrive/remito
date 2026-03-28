export default function initCookies() {

	function setCookie(name, value, days) {
		const expires = new Date()
		expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
		document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
	}

	function getCookie(name) {
		const nameEQ = name + '='
		const ca = document.cookie.split(';')
		for (let c of ca) {
			c = c.trimStart()
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length)
		}
		return null
	}

	/* ---- Показываем баннер если нет согласия ---- */
	function checkCookieConsent() {
		const banner = document.getElementById('cookieBanner')
		if (!banner) return
		if (!getCookie('cookieConsent')) {
			setTimeout(() => banner.classList.add('show'), 500)
		}
	}

	/* ---- Принять (глобальная — вызывается из onclick) ---- */
	window.acceptCookies = function () {
		setCookie('cookieConsent', 'accepted', 365)
		const banner = document.getElementById('cookieBanner')
		if (!banner) return
		banner.classList.remove('show')
		banner.classList.add('hiding')
		banner.addEventListener('transitionend', () => banner.remove(), { once: true })
	}

	/* ---- Аналитика ---- */
	function initializeGoogleAnalytics() {
		const s = document.createElement('script')
		s.async = true
		s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XB0MCYQ55N'
		s.onload = () => {
			window.dataLayer = window.dataLayer || []
			function gtag() { dataLayer.push(arguments) }
			window.gtag = gtag
			gtag('js', new Date())
			gtag('config', 'G-XB0MCYQ55N')
		}
		document.head.appendChild(s)
	}

	function initializeYandexMetrika() {
		const k = document.createElement('script')
		k.async = 1
		k.src = 'https://mc.yandex.ru/metrika/tag.js?id=106420255'
		document.head.appendChild(k)

		window.ym = window.ym || function () { (ym.a = ym.a || []).push(arguments) }
		ym.l = 1 * new Date()

		k.onload = () => {
			ym(106420255, 'init', {
				webvisor: true,
				clickmap: true,
				ecommerce: 'dataLayer',
				accurateTrackBounce: true,
				trackLinks: true,
			})
		}

		requestAnimationFrame(() => {
			if (document.body) {
				const ns = document.createElement('noscript')
				ns.innerHTML = '<div><img src="https://mc.yandex.ru/watch/106420255" style="position:absolute;left:-9999px" alt=""></div>'
				document.body.appendChild(ns)
			}
		})
	}

	function initializeAnalytics() {
		initializeGoogleAnalytics()
		initializeYandexMetrika()
	}

	checkCookieConsent()
	initializeAnalytics()
}