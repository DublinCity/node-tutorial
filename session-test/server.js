const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')

const parseCookie = (cookie = '') => {
  const cookieObj = {};
  const result = cookie.split(';')
  .map(keyValue => keyValue.split('='))
  .forEach(([key, value]) => {
    cookieObj[key.trim()] = value;
  })
  return cookieObj;
}

http.createServer((req, res) => {
  const cookie = parseCookie(req.headers.cookie)
  console.log('cookie',cookie.name)
  if(req.url.startsWith('/login')) {
    const { query } = url.parse(req.url)
    const { name } = qs.parse(query)
    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 5)

    res.writeHead(302, {
      'Location': '/',
      'set-cookie': `name=${encodeURIComponent(name)}; expires=${expires.toGMTString()}; httpOnly;`
    })
    // location: '/' 이므로 모든 url 에서(같은 호스트) 쿠키를 전송할 수 있다.
    // encodeURIComponent header에 한글을 사용하기 때문에 필요.
    // GMT, UTC 혼용하여 쓰이나 UTC를 기술적으로 사용한다.
    // httpOnly 자바스크립트로 해당 쿠키 접근 불가
    res.end()
  } else if(cookie.name) {
    
    res.writeHead(200, {'content-type': 'text/plain; charset=utf-8;'})
    res.end(`welcome ${decodeURIComponent(cookie.name)}님!`)
  } else {
    fs.readFile('./index.html',(err, data) => {
      if(err) { 
        console.error(err)
      }
      res.end(data)
    })
  }
}).listen(8888,() => {
  console.log('server running')
})


