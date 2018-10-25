function getUser() { // 로딩시 사용자가 가져오는 함수
  console.log('get')
  var xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if(xhr.status === 200) {
      console.log('!',xhr.responseText)
      var user = JSON.parse(xhr.responseText) // ?
      var list = document.getElementById('list')
      list.innerHTML = ''
      Object.keys(user).map(key => {
        var userDiv = document.createElement('div')
        var span = document.createElement('span')
        span.textContent = user[key]

        var edit = document.createElement('button')
        edit.textContent = "edit"
        edit.addEventListener('click', () => { // edit button
          var name = prompt('type edit name')
          if(!name) {
            return alert('must name!')
          }
          var xhr = new XMLHttpRequest()
          xhr.onload = () => {
            if(xhr.status === 200) {
              console.log(xhr.responseText)
              getUser() // ??
            }else {
              console.error(xhr.responseText)
            }
          }
          xhr.open('PUT', '/users/' + key)
          xhr.setRequestHeader('Content-type', 'application/json')
          xhr.send(JSON.stringify({name}))
        })

        var remove = document.createElement('button')
        remove.textContent = "remove"
        remove.addEventListener('click', () => {
          var xhr = new XMLHttpRequest()
          xhr.onload = () => { 
            if(xhr.status === 200) {
              console.log(xhr.responseText)
              getUser()
            }else {
              console.error(xhr.responseText)
            }
          }

          xhr.open('DELETE','/users/'+ key)
          xhr.send();
        })

        userDiv.append(span,edit,remove)
        list.append(userDiv)
      })
    }else {
      console.error(xhr.responseText)
    }
  }
  xhr.open('GET','/users')
  xhr.send();
}

window.onload = getUser;

const form = document.getElementById('form')
form.addEventListener('submit', e => {
  e.preventDefault()
  var name = e.target.username.value
  if(!name) {
    return alert('must name')
  }

  var xhr = new XMLHttpRequest()
  xhr.onload = () => {
    if(xhr.status === 201) {
      console.log(xhr.responseText)
      getUser()
    }else {
      console.error(xhr.responseText)
    }
  }
  xhr.open('POST','/users')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify({name}))
  e.target.username.value = ''
})