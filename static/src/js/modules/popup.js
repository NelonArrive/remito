export default function initPopup() {
	const overlay = document.getElementById('popupOverlay')
	const closePopup = () => {
		overlay.classList.remove('active')
		setTimeout(() => (overlay.style.display = 'none'), 300)
	}

	document.querySelectorAll('.open-popup').forEach(btn => {
		btn.addEventListener('click', () => {
			overlay.style.display = 'flex'
			requestAnimationFrame(() => overlay.classList.add('active'))
		})
	})

	document.getElementById('popupClose')?.addEventListener('click', closePopup)
	overlay.addEventListener('click', e => {
		if (e.target === e.currentTarget) closePopup()
	})
}
