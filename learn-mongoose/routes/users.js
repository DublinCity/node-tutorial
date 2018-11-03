var express = require('express');
var User = require('../schemas/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({})
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

router.post('/', (req, res, next)=> {
	const { name, age, married } = req.body;
	const user = new User({
		name,
		age,
		married,
	});
  
	user.save()
		.then(result => {
			res.status(201).json(result);
		}).catch(err => {
			console.log(err);
			next(err);
		});
});

module.exports = router;
