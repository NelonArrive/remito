export default function initAccordion() {
	document.querySelectorAll('.faq-item__btn').forEach(btn => {
		btn.addEventListener('click', () => {
			const item = btn.closest('.faq-item')
			const isOpen = item.classList.contains('is-open')

			// Закрываем все
			document.querySelectorAll('.faq-item.is-open').forEach(el => {
				el.classList.remove('is-open')
			})

			// Открываем текущий если был закрыт
			if (!isOpen) item.classList.add('is-open')
		})
	})

	// Фильтр по тегам
	const tags = document.querySelectorAll('.faq__tag')
	const items = document.querySelectorAll('.faq-item')

	tags.forEach(tag => {
		tag.addEventListener('click', () => {
			tags.forEach(t => t.classList.remove('is-active'))
			tag.classList.add('is-active')

			const filter = tag.dataset.filter

			items.forEach(item => {
				if (filter === 'all' || item.dataset.cat === filter) {
					item.style.display = ''
				} else {
					item.style.display = 'none'
					item.classList.remove('is-open')
				}
			})
		})
	})

	// Открываем первый вопрос по умолчанию
	document.querySelector('.faq-item')?.classList.add('is-open')
}
