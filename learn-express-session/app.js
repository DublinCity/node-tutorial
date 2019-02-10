var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	store: new FileStore(),
}));

app.get('/', (req, res) => {
	const { isLogined, email } = req.session;
	res.send(isLogined? `welcome! ${email}`:'<a href="/login">login</a>');
});

app.get('/login', function (req, res, next) {
	res.send(`<form method="post" action="/login/auth">
  <label>email</label>
  <input type="text" name="email"/>
  <label>password</label>
  <input type="password" name="pwd"/>
  <input type="submit" name="login"/>
  </form>`);
});

app.post('/login/auth', (req, res)=> {
	const { email, pwd } = req.body;
	if(email){
		req.session.email = email;
		req.session.password = pwd;
		req.session.save(() => {
			res.redirect('/');}
		);
	}else {
		res.redirect('/login');
	}
});

app.listen(3001, ()=> console.log('listen'));