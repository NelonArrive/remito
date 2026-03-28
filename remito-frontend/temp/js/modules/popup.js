export default function initPopup() {
  /* ---- Открыть / закрыть ---- */
  function open(overlayId) {
    const el = document.getElementById(overlayId)
    if (!el) return
    el.classList.add('is-open')
    document.body.classList.add('popup-open')
  }

  function close(overlayId) {
    const el = document.getElementById(overlayId)
    if (!el) return
    el.classList.remove('is-open')
    if (!document.querySelector('.popup-overlay.is-open')) {
      document.body.classList.remove('popup-open')
    }
  }

  function openPopup() {
    open('popupOverlay')
  }

  function showThankYou() {
    close('popupOverlay')
    setTimeout(() => open('successOverlay'), 200)
  }

  function bindEvents() {
    // Закрытие формы
    document.getElementById('popupClose')?.addEventListener('click', () => close('popupOverlay'))
    document.getElementById('popupOverlayBg')?.addEventListener('click', () => close('popupOverlay'))

    // Закрытие success
    document.getElementById('successClose')?.addEventListener('click', () => close('successOverlay'))
    document.getElementById('successCloseBtn')?.addEventListener('click', () => close('successOverlay'))
    document.getElementById('successOverlayBg')?.addEventListener('click', () => close('successOverlay'))

    // Escape
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return
      close('popupOverlay')
      close('successOverlay')
    })

    document.addEventListener('click', e => {
      if (e.target.closest('[data-popup="open"]')) openPopup()
    })
  }

  bindEvents()

  return { openPopup, showThankYou }
}