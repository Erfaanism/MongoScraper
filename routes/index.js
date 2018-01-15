const express = require('express');
const router = express.Router();
const scraperMT = require('../controllers/scraper');
const postModel = require('../models/posts');

router.get('/', (req, res) => {
	postModel.find({}).sort('-date').exec((error, posts) => {
		res.render('index', { posts });
	});
});

router.get('/refresh', (req, res) => {
	scraperMT();
	res.end();
	// res.redirect('/');
});

router.get('/comments/:postID', (req, res) => {

});

router.post('/comments/:postID', (req, res) => {

});

router.delete('/delete/:postID', (req, res) => {

});
module.exports = router;