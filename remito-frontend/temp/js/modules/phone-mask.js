export default function initPhoneMask() {
	document.querySelectorAll('.phone-input').forEach(input => {
		IMask(input, { mask: '+{7} (000) 000-00-00' })
	})
}
