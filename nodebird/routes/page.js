const express = require('express');

const router = express.Router();

router.get('/profile', (req, res) => {
	// res.render('profile', { title: 'my infomation', user: null });
	res.end('profile');
});

router.get('/join', (req, res) => {
	res.render('join', {
		title: 'sign up',
		user: null,
		joinError: req.flash('joinError'),
	});
});

router.get('/', (req, res) => {
	res.render('main', {
		title: 'node bird',
		twits: [],
		user: null,
		joinError: req.flash('joinError'),
	});
});

module.exports = router;