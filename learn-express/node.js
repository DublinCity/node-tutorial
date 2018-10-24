const http = require('http');
const fs = require('fs')
const path = require('path')

http.createServer((req, res)=> {
  fs.readFile(path.join(__dirname,'index.html'), (err,data)=> {
    if(err) {
      console.error(err)
      res.end()
    }
    let a = ''
    a += data;
    console.log(typeof a)
    console.log(Buffer.isBuffer(data))
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end(a);
  })
}).listen(8088, () => {
  console.log('listening')
})