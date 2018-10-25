const http = require('http')
const fs = require('fs')
const path = require('path')

const users = {}
http.createServer((req, res) => {
  if(req.method === 'GET') {
    if(req.url === '/') {
      return fs.readFile('./index.html', (err, data) => {
        if(err) { 
          throw err
        }
        res.end(data)
      })
    } else if(req.url === '/users') {
      return res.end(JSON.stringify(users))
    }
    return fs.readFile(`.${req.url}`,(err,data) => {
      if(err) { 
        res.writeHead('404', 'Not Found')
        res.end('not Fount')
      }
      res.end(data)
    })
  } else if(req.method === 'POST') {
    if(req.url === '/users') {
      let body = ''
      req.on('data', data => {
        console.log('data')
        body += data
      })
      console.log('sync')
      return req.on('end',() => {
        console.log(body)
        const key =  +new Date()
        users[key] = JSON.parse(body).name
        res.writeHead(201)
        res.end('written')
      })
    }
  } else if (req.method === 'PUT') {
    if(req.url.startsWith('/users/')) {
      const key = req.url.split('/')[2]
      let body = ''
      req.on('data', data => {
        body += data
      })

      return req.on('end', () => {
        console.log('PUT: ', body)
        users[key] = JSON.parse(body).name
        return res.end(JSON.stringify(users))
      })
    }
  } else if (req.method === 'DELETE') {
    if(req.url.startsWith('/users/')) {
      const key = req.url.split('/')[2]
      delete users[key]
      res.end(JSON.stringify(users))
      console.log('delete',key, users)
    }
  }
  console.log('last')
  res.writeHead(404,'not found')
  res.end('not found')
}).listen(8888, () => {
  
})