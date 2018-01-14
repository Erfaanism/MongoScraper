const express = require('express');
const router = express.Router();
const scraperMT = require('../controllers/scraper');

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/refresh', (req, res) => {
	console.log(req.ip);
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