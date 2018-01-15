const postModel = require('../models/posts');
const cheerio = require('cheerio');
const request = require('request');
const config = require('../config/config.json');
const moment = require('moment');

const scrapeMT = res => {
	postModel.remove({}).then(() => {
		let posts = [];
		request(config.request, (error, response, body) => {
			if (error) return console.log(error);
			if (response.statusCode === 200) {

				const htmlBody = body;
				const $ = cheerio.load(htmlBody);

				$('.l-content-grid article').each((i, elem) => {
					let post = {
						postID: elem.attribs.id.replace('node-', '').replace(/\-.*/, ''),
						image: $(elem).find('.teaser__image .fixed-ratio img').data('srcset').replace(/\?.*/, '').replace('192w', '1260w'),
						link: `https://www.topgear.com${$(elem).find('.teaser__text-content .teaser__title a').attr('href')}`,
						title: $(elem).find('.teaser__text-content .teaser__title a').text(),
						description: $(elem).find('.teaser__text-content .teaser__description p').text().replace('...', ''),
						authorName: $(elem).find('.teaser__text-content .teaser__details .teaser__author a').text() ? $(elem).find('.teaser__text-content .teaser__details .teaser__author a').text() : '',
						authorLink: $(elem).find('.teaser__text-content .teaser__details .teaser__author a').attr('href') ? `https://www.topgear.com${$(elem).find('.teaser__text-content .teaser__details .teaser__author a').attr('href')}` : '',
						date: $(elem).find('.teaser__text-content .teaser__details .teaser__date').text() ? moment($(elem).find('.teaser__text-content .teaser__details .teaser__date').text(), 'D-MMM-YYYY').format('MMMM DD, YYYY') : ''
					};
					posts.push(post);
				});
				const postPromises = posts.map(value => {
					return postModel.findOneAndUpdate({ postID: value.postID }, value, { upsert: true }, (error, result) => {
						if (error) return console.log(`Insert Post error: ${error}`);
					});
				});
				Promise.all(postPromises).then(() => {
					postModel.find({}).sort('-postID').then(() => {
						res.redirect('/');
					});
				});
			};
		});
	});
};

module.exports = scrapeMT;