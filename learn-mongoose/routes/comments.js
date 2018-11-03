const express = require('express');
const Comment = require('../schemas/comment');
const router = express.Router();

router.get('/:id', (req, res, next) => {
	const { id } = req.params;
	Comment.find({ commenter: id }).populate('commenter')
		.then(comments => {
			res.json(comments);
		})
		.catch(error => {
			console.log(error);
			next(error);
		});
});

router.post('/', (req, res, next) => {
	const { id, comment } = req.body;
	const newComment  = new Comment({
		commenter: id,
		comment,
	});
	newComment.save()
		.then(result => {
			return Comment.populate(result, { path: 'commenter' });
		})
		.then(result => {
			res.status(201).json(result);
		})
		.catch(err=> {
			console.log(err);
			next(err);
		});
});

router.patch('/:id', (req, res, next) => {
	const { comment } = req.body;
	Comment.update({ _id: req.params.id }, { comment })
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

module.exports = router;