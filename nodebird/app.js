const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session	= require('express-session');
const flash = require('connect-flash');
const router = require('./route');

const app = express();

app.set('port', process.env.PORT || 3030);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extends:false }));

app.use(cookieParser('node'));
app.use(session({
	resave:false,
	saveUninitialized: false,
	secret: 'node',
	cookie: {
		httpOnly: true,
		secure: false,
	},
}));
app.use(flash());


app.use('/', router);
app.use((req, res, next) => {
	const err = new Error('Not found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

app.listen(app.get('port'), () => {
	console.log('running on!', app.get('port'));
});