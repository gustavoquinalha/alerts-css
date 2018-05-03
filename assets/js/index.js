const alerts = document.querySelectorAll('.fa-times-circle')
const alertsFade = document.querySelectorAll('.alert-fade')

const options = { attributes: true }

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
  father.classList.toggle('alert_none')
}))

function show (btn) {
  const alerts = btn.nextElementSibling.children
  for (const el of alerts) {
    if (!checkShowing(el)) el.classList.remove(`alert_none`)
  }
}

const onClassChange = new Event(`classChange`)

function createNewObserver() {
  const observer = new MutationObserver(mutationList => {
    mutationList[0].target.dispatchEvent(onClassChange)
    observer.disconnect()
  })
  return observer
}

alertsFade.forEach(el => {
  const mutation = createNewObserver()
  mutation.observe(el, options)
})

alertsFade.forEach(el => el.addEventListener('classChange', ev => {
  const time = parseInt(ev.target.getAttribute('data-fade-time')) * 1000
  console.log('Class Changed!', ev)
  setTimeout(() => {
    ev.target.classList.toggle('alert_none')
    const mutation = createNewObserver()
    mutation.observe(ev.target, options)
  }, time)
}))
