// loading comment on username click
[].forEach.call(document.querySelectorAll('#user-list tr'), el => {
  el.addEventListener('click', () => {
    const id = el.querySelector('td').textContent;
    getComment(id);
  })
})

const getComment = id => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if(xhr.status === 200) {
      const comments = JSON.parse(xhr.responseText)
      const tbody = document.querySelector('#comment-list tbody')
      tbody.innerHTML = '';
      comments.map(comment => {
        const row = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = comment.id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.user.name
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.comment
        row.appendChild(td);
        const edit = document.createElement('button')
        edit.textContent = 'Edit'
        edit.addEventListener('click', () => {
          let newComment = prompt('type change comment')
          if(!newComment) {
            return alert('must type comment')
          }
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if(xhr.status === 200) {
              console.log(xhr.responseText)
              getComment(id)
            }else {
              console.error(xhr.responseText)
            }
          }
          xhr.open('PATCH', '/comments/'+ comment.id)
          xhr.setRequestHeader('content-type', 'application/json')
          xhr.send(JSON.stringify({comment: newComment}))
        })

        const remove = document.createElement('button');
        remove.textContent = 'Remove'
        remove.addEventListener('click', () => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if(xhr.status === 200) {
              console.log(xhr.responseText)
              getComment(id)
            }else {
              console.error(xhr.responseText)
            }
          }
          xhr.open('DELETE', '/comments/' + comment.id)
          xhr.send();
        })

        td = document.createElement('td')
        td.appendChild(edit)
        row.appendChild(td)
        td = document.createElement('td')
        td.appendChild(remove)
        row.appendChild(td)
        tbody.appendChild(row)
      })
    } else {
      console.error(xhr.responseText)
    }
  }
  xhr.open('GET', '/comments/' + id)
  xhr.send();
}

const getUsers = () => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if(xhr.status === 200) {
      const users = JSON.parse(xhr.responseText)
      const tbody = document.querySelector('#user-list tbody')
      tbody.innerHTML = '';
      users.map(user => {

        const row = document.createElement('tr');
        row.addEventListener('click', () => {
          getComment(user.id)
        })
        
        let td = document.createElement('td')
        td.textContent = user.id
        row.appendChild(td)
        td = document.createElement('td')
        td.textContent = user.name
        row.appendChild(td)
        td = document.createElement('td')
        td.textContent = user.age
        row.appendChild(td)
        td = document.createElement('td')
        td.textContent = user.married? 'married': 'not married'
        row.appendChild(td)
        tbody.appendChild(row)
      })
    } else {
      console.error(xhr.responseText)
    }
  }
  xhr.open('GET', '/users')
  xhr.send()
}

document.getElementById('user-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.username.value;
  const age = e.target.age.value;
  const married = e.target.married.checked;

  if(!name) {
    return alert('type name')
  }
  if(!age) {
    return alert('type age')
  }

  const xhr = new XMLHttpRequest()
  xhr.onload = () => {
    if(xhr.status === 201) {
      console.log(xhr.responseText)
      getUsers();
    }else {
      console.error(xhr.responseText)
    }
  }
  xhr.open('POST', '/users')
  xhr.setRequestHeader('content-type','application/json')
  xhr.send(JSON.stringify({name, age, married}))

  e.target.username.value = ''
  e.target.age.value = ''
  e.target.married.checked = false
})

document.getElementById('comment-form').addEventListener('submit', e => {
  e.preventDefault();
  const id = e.target.userid.value
  const comment = e.target.comment.value

  if(!id) {
    return alert('type userID')
  }
  if(!comment) {
    return alert('type comment')
  }

  const xhr = new XMLHttpRequest()
  xhr.onload = () => {
    if(xhr.status === 201) {
      getComment(id)
    } else {
      console.error(xhr.responseText)
    }
  }
  xhr.open('POST', '/comments')
  xhr.setRequestHeader('content-type','application/json')
  xhr.send(JSON.stringify({id, comment}))
  e.target.userid.value = ''
  e.target.comment.value = ''
})