const TELEGRAM_TOKEN  = '8583031121:AAFzvwwx-sE6yqmE80mTOWJCas8RWOS2RAI'
  const TELEGRAM_CHAT_ID = '6430141755'

  function openPopup(overlayId) {
    const overlay = document.getElementById(overlayId)
    overlay.classList.add('is-open')
    document.body.classList.add('popup-open')
  }

  function closePopup(overlayId) {
    const overlay = document.getElementById(overlayId)
    overlay.classList.remove('is-open')
    const anyOpen = document.querySelector('.popup-overlay.is-open')
    if (!anyOpen) document.body.classList.remove('popup-open')
  }

  /* ---- Открытие через data-атрибут (любая кнопка на сайте) ---- */
  // Использование: <button data-popup="formPopupOverlay">Вызвать</button>
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-popup]')
    if (trigger) openPopup(trigger.dataset.popup)
  })

  /* ---- Demo-кнопки ---- */
  document.getElementById('openFormPopup')?.addEventListener('click', () => openPopup('formPopupOverlay'))
  document.getElementById('openSuccessPopup')?.addEventListener('click', () => openPopup('successPopupOverlay'))

  /* ---- Закрытие ---- */
  document.getElementById('formPopupClose')?.addEventListener('click',   () => closePopup('formPopupOverlay'))
  document.getElementById('formPopupBg')?.addEventListener('click',      () => closePopup('formPopupOverlay'))
  document.getElementById('successPopupClose')?.addEventListener('click',() => closePopup('successPopupOverlay'))
  document.getElementById('successPopupX')?.addEventListener('click',    () => closePopup('successPopupOverlay'))
  document.getElementById('successPopupBg')?.addEventListener('click',   () => closePopup('successPopupOverlay'))

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closePopup('formPopupOverlay')
      closePopup('successPopupOverlay')
    }
  })

  ;[['p-name','pg-name'],['p-phone','pg-phone'],['p-service','pg-service']].forEach(([inputId, groupId]) => {
    document.getElementById(inputId)?.addEventListener('input', () => {
      document.getElementById(groupId)?.classList.remove('has-error')
    })
  })

  function validatePopupForm() {
    let ok = true
    const checks = [
      { gId: 'pg-name',    iId: 'p-name',    fn: v => v.trim().length >= 2 },
      { gId: 'pg-phone',   iId: 'p-phone',   fn: v => v.replace(/\D/g,'').length >= 11 },
      { gId: 'pg-service', iId: 'p-service', fn: v => v !== '' },
    ]
    checks.forEach(({ gId, iId, fn }) => {
      const group = document.getElementById(gId)
      const input = document.getElementById(iId)
      if (fn(input.value)) {
        group.classList.remove('has-error')
      } else {
        group.classList.add('has-error')
        ok = false
      }
    })
    return ok
  }

  document.getElementById('popupForm')?.addEventListener('submit', async e => {
    e.preventDefault()
    if (!validatePopupForm()) return

    const consent = document.getElementById('p-consent')
    if (!consent?.checked) return

    const btn = document.getElementById('popupSubmitBtn')
    btn.classList.add('is-loading')

    const name    = document.getElementById('p-name').value.trim()
    const phone   = document.getElementById('p-phone').value.trim()
    const service = document.getElementById('p-service').value
    const comment = document.getElementById('p-comment').value.trim()

    const message = `
📝 <b>Новая заявка — Remito (попап)</b>
————————————————————
👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
🔧 <b>Услуга:</b> ${service || '—'}
💬 <b>Комментарий:</b> ${comment || '—'}
🔐 <b>Согласие:</b> ✅
————————————————————
⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })}
    `.trim()

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
          }),
        }
      )
      if (!res.ok) throw new Error(`TG error: ${res.status}`)

      e.target.reset()
      closePopup('formPopupOverlay')
      setTimeout(() => openPopup('successPopupOverlay'), 200)

    } catch (err) {
      console.error('Telegram send error:', err)
      alert('Не удалось отправить заявку. Пожалуйста, позвоните нам: +7 (343) 123-45-67')
    } finally {
      btn.classList.remove('is-loading')
    }
  })