export default function initSwiper() {
	const SLIDE_DURATION = 5000
	const progressBar = document.getElementById('heroProgressBar')
	let progressInterval = null

	function startProgress() {
		clearInterval(progressInterval)
		progressBar.style.transition = 'none'
		progressBar.style.width = '0%'
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`
				progressBar.style.width = '100%'
			})
		})
	}

	const heroSwiper = new Swiper('.hero-swiper', {
		loop: true,
		speed: 700,
		autoplay: {
			delay: SLIDE_DURATION,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			prevEl: '#heroPrev',
			nextEl: '#heroNext',
		},
		on: {
			init() {
				startProgress()
			},
			slideChangeTransitionStart() {
				startProgress()
			},
		},
	})

	const productsSwiper = new Swiper('.products-swiper', {
		slidesPerView: 1.2,
		spaceBetween: 16,
		grabCursor: true,
		loop: true,
		pagination: {
			el: '#productsPagination',
			clickable: true,
		},
		navigation: {
			prevEl: '#productsPrev',
			nextEl: '#productsNext',
		},
		breakpoints: {
			480: { slidesPerView: 1.5, spaceBetween: 16 },
			640: { slidesPerView: 2, spaceBetween: 18 },
			900: { slidesPerView: 3, spaceBetween: 20 },
			1200: { slidesPerView: 4, spaceBetween: 22 },
		},
	})

	const reviewsSwiper = new Swiper('.reviews-swiper', {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		grabCursor: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			prevEl: '#reviewsPrev',
			nextEl: '#reviewsNext',
		},
		breakpoints: {
			600: { slidesPerView: 1.5 },
			768: { slidesPerView: 2, spaceBetween: 20 },
			1024: { slidesPerView: 3, spaceBetween: 24 },
		},
		autoplay: {
			delay: 4500,
			disableOnInteraction: true,
			pauseOnMouseEnter: true,
		},
	})

	document.querySelectorAll('.products__tab').forEach(tab => {
		tab.addEventListener('click', () => {
			document.querySelectorAll('.products__tab').forEach(t => t.classList.remove('is-active'))
			tab.classList.add('is-active')
		})
	})
}
