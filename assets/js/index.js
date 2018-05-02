const alerts = document.querySelectorAll('.fa-times-circle')

function getAlert(el) {
  if (el.classList.contains('alert')) return el
  else return getAlert(el.parentNode)
}

function checkShowing(el) {
  if (el.classList.contains('alert_none')) return false
  else return true
}

alerts.forEach(el => el.addEventListener('click', () => {
  const father = getAlert(el)
  if (checkShowing(father)) father.classList.add('alert_none')
  else father.classList.remove('alert_none')
}))

function show (btn) {
  const alerts = btn.nextElementSibling.children
  for (const el of alerts) {
    if (!checkShowing(el)) el.classList.remove(`alert_none`)
  }
}
