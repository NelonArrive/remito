export default function initAnimation() {
	const statNums = document.querySelectorAll('.adv-stat__num[data-count]')

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible')
					animateCount(entry.target)
					observer.unobserve(entry.target)
				}
			})
		},
		{ threshold: 0.3 },
	)

	statNums.forEach(el => observer.observe(el))

	function animateCount(el) {
		const target = parseInt(el.dataset.count)
		const countVal = el.querySelector('.count-val')
		if (!countVal) return

		const duration = 1400
		const start = performance.now()

		function step(now) {
			const elapsed = now - start
			const progress = Math.min(elapsed / duration, 1)
			const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
			const current = Math.round(eased * target)
			countVal.textContent =
				current >= 1000 ? current.toLocaleString('ru-RU') : current
			if (progress < 1) requestAnimationFrame(step)
		}
		requestAnimationFrame(step)
	}

	// ==============================================
	const steps = document.querySelectorAll('.how-step')

	const observerHow = new IntersectionObserver(
		entries => {
			entries.forEach((entry, i) => {
				if (entry.isIntersecting) {
					// Задержка по очереди
					const index = Array.from(steps).indexOf(entry.target)
					setTimeout(() => {
						entry.target.classList.add('is-visible')
					}, index * 100)
					observerHow.unobserve(entry.target)
				}
			})
		},
		{ threshold: 0.2 },
	)

	steps.forEach(step => observer.observe(step))
}
