const express = require('express');
const router = express.Router();
const scraperMT = require('../controllers/scraper');
const postModel = require('../models/posts');
const commentsModel = require('../models/comments');

router.get('/', (req, res) => {
	postModel.find({}).sort('_id').then(posts => {
		res.render('index', { posts, ip: req.ip });
	});
});

router.get('/refresh', (req, res) => {
	scraperMT(res);
});

router.get('/comments/:postID', (req, res) => {
	commentsModel.find(req.params).sort('_id').then(comments => {
		res.status(200).json(comments);
	});
});

router.post('/comments', (req, res) => {
	commentsModel.create(req.body, (error, result) => {
		if (error) return console.log(error);
		res.status(200).end();
	});
});

router.delete('/comments/:commentID', (req, res) => {
	commentsModel.findByIdAndRemove(req.params.commentID).then(() => {
		res.status(200).end();
	});
});
module.exports = router;