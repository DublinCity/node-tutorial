const express = require('express');

const router = express.Router();

router
	.get('/profile', (req, res) => {
		res.render('profile', { title: 'my info', user: null });
	})
	.get('/join', (req, res) => {
		res.render('join', {
			title: 'sign up',
			user: null,
			joinError: req.flash('joinError'),
		});
	})
	.get('/', (req, res, next) => {
		res.render('main', {
			title: 'main',
			twits: [],
			user:null,
			loginError: req.flash('loginError'),
		});
	});
  
module.exports = router;