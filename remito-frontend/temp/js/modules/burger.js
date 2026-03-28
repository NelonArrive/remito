export default function initBurger() {
	const burger = document.getElementById('burgerBtn')
	const mobileMenu = document.getElementById('mobileMenu')
	const menuOverlay = document.getElementById('menuOverlay')
	const menuClose = document.getElementById('menuClose')
	const body = document.body

	function openMenu() {
		mobileMenu.classList.add('is-open')
		burger.classList.add('is-open')
		burger.setAttribute('aria-expanded', 'true')
		body.style.overflow = 'hidden'
	}

	function closeMenu() {
		mobileMenu.classList.remove('is-open')
		burger.classList.remove('is-open')
		burger.setAttribute('aria-expanded', 'false')
		body.style.overflow = ''
	}

	burger.addEventListener('click', () => {
		mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu()
	})

	menuClose.addEventListener('click', closeMenu)
	menuOverlay.addEventListener('click', closeMenu)

	// Закрытие по Escape
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') closeMenu()
	})

	// Аккордеон "Услуги" в мобайл-меню
	const servicesToggle = document.getElementById('servicesToggle')
	const servicesSub = document.getElementById('servicesSub')

	servicesToggle.addEventListener('click', e => {
		e.preventDefault()
		const isOpen = servicesSub.classList.toggle('is-open')
		servicesToggle.setAttribute('aria-expanded', isOpen)
		const arrow = servicesToggle.querySelector('svg')
		arrow.style.transform = isOpen ? 'rotate(180deg)' : ''
	})
}
