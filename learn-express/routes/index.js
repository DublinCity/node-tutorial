var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
 
  if(req.method === 'POST') {
    let body = ''
    req.on('data',(data)=> {
      body += data      
    })
    return req.on('end', () => {
      console.log('본문', body)
      const {a} = JSON.parse(body)
      console.log('a',a)
      res.end();
    })
  }else {
    console.log(__dirname)
    var a = []
    fs.readFile(__dirname + '/users.js', (err, data)=> {
      res.setHeader('content-type','text')
      res.send(data);
    })
  }
  
});

module.exports = router;
 