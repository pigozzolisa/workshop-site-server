// main.js

const update = document.querySelector('#update-button')
update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar',
      quote: 'I find your lack of faith disturbing.'
    })
  })
})

const messageDiv = document.querySelector('#message')
const deleteButton = document.querySelector('#delete-button')
deleteButton.addEventListener('click', _ => {

  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar',
    })
  })
  .then(response => {
    if (response === 'No quote to delete') {
      messageDiv.textContent = 'No Darth Vadar quote to delete'
    } else {
      if (typeof window !== 'undefined') {
        window.location.reload(true)
      }  
    }
  })
})

