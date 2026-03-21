export default function initCookies() {
	function setCookie(name, value, days) {
		const expires = new Date()
		expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
		document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
	}

	function getCookie(name) {
		const nameEQ = name + '='
		const ca = document.cookie.split(';')
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i].trim()
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length)
		}
		return null
	}

	const banner = document.getElementById('cookieBanner')

	function showBanner() {
		setTimeout(() => banner.classList.add('show'), 500)
	}

	function hideBanner() {
		banner.classList.remove('show')
	}

	function initGoogleAnalytics() {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://www.googletagmanager.com/gtag/js?id=G-SLRDQD9TEG'
		document.head.appendChild(script)
		script.onload = () => {
			window.dataLayer = window.dataLayer || []
			window.gtag = function() {
				dataLayer.push(arguments)
			}
			gtag('js', new Date())
			gtag('config', 'G-SLRDQD9TEG')
		}
	}

	function initYandexMetrika() {
		;(function(m, e, t, r, i, k, a) {
			m[i] =
				m[i] ||
				function() {
					;(m[i].a = m[i].a || []).push(arguments)
				}
			m[i].l = 1 * new Date()
			for (let j = 0; j < document.scripts.length; j++) {
				if (document.scripts[j].src === r) return
			}
			k = e.createElement(t)
			a = e.getElementsByTagName(t)[0]
			k.async = 1
			k.src = r
			a.parentNode.insertBefore(k, a)
		})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')
		window.ym(103130277, 'init', {
			clickmap: true,
			trackLinks: true,
			accurateTrackBounce: true,
			webvisor: true,
		})
		const ns = document.createElement('noscript')
		ns.innerHTML =
			'<div><img src="https://mc.yandex.ru/watch/103130277" style="position:absolute;left:-9999px" alt=""/></div>'
		document.body.appendChild(ns)
	}

	function initAnalytics() {
		initGoogleAnalytics()
		initYandexMetrika()
	}

	document.getElementById('cookieAccept').addEventListener('click', () => {
		setCookie('cookieConsent', 'accepted', 365)
		setCookie('cookieAnalytics', 'true', 365)
		setCookie(
			'cookieMarketing',
			document.getElementById('toggle-marketing')?.checked ? 'true' : 'false',
			365,
		)
		hideBanner()
		initAnalytics()
	})

	document.getElementById('cookieDecline').addEventListener('click', () => {
		setCookie('cookieConsent', 'necessary', 365)
		setCookie('cookieAnalytics', 'false', 365)
		setCookie('cookieMarketing', 'false', 365)
		hideBanner()
	})

	document.getElementById('cookieClose').addEventListener('click', () => {
		setCookie('cookieConsent', 'necessary', 365)
		hideBanner()
	})

	const detailsBtn = document.getElementById('cookieDetailsBtn')
	const typesBlock = document.getElementById('cookieTypes')

	detailsBtn.addEventListener('click', () => {
		const isOpen = typesBlock.classList.toggle('is-open')
		detailsBtn.classList.toggle('is-open', isOpen)
		detailsBtn.querySelector('span') && null
	})

	document.addEventListener('DOMContentLoaded', () => {
		const consent = getCookie('cookieConsent')
		if (!consent) {
			showBanner()
		} else if (consent === 'accepted') {
			initAnalytics()
		}
	})
}
