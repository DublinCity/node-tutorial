var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
	
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	store: new FileStore(),
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	// second argument will be saved in sessions store as session id.
	// serializeUser function be called when initial log in.
	done(null, user.email); 
});

passport.deserializeUser(function(id, done) {
	//	deserializeUser be called when every page access and only id is stored.
	//	second argument be sent to successRedirect route.
	  done(null, {
		name: 'daniel',
	});
});

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'pwd',
},
function(username, password, done) {
	console.log(username, password);
	if(username === 'daniel@naver.com') {
		if(password === 'password') {
			console.log('login');
			done(null, {
				email: username,
				isLogined: true,
			});
		}else {
			done(null, false, {
				message: 'not matched password',
			});
		}
	}else {
		done(null, false, {
			message: 'not matched email',
		});
	}
}
));

app.get('/', (req, res) => {
	const { user } = req;
	return res.send(user? `welcome! ${user.name} <div><a href="/logout">logout</a></div>`:'<a href="/login">login</a>');
});

app.get('/login', function (req, res, next) {
	return res.send(`<form method="post" action="/login/auth">
  <label>email</label>
  <input type="text" name="email"/>
  <label>password</label>
  <input type="password" name="pwd"/>
  <input type="submit" name="login"/>
  </form>`);
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.post('/login/auth',
	passport.authenticate('local', { 
		successRedirect: '/',
		failureRedirect: '/login',
	})
);

app.listen(3001, ()=> console.log('listen'));