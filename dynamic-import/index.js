const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')

btn1.addEventListener('click',e => {
  const inputs =  document.getElementsByTagName('input')
  import('./add.js').then(add => {
    const sum = add.default(inputs[0].value,inputs[1].value)
    console.log('add load')
    document.body.append(sum)
  })
})

btn2.addEventListener('click',e => {
  const inputs =  document.getElementsByTagName('input')
  import('./append.js').then(append => {
    console.log('append load')
    append.default()
  })
})