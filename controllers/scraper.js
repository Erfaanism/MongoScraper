const postModel = require('../models/posts');
const cheerio = require('cheerio');
const request = require('request');
const config = require('../config/config.json');

const scrapeMT = () => {
	let posts = [];
	request(config.request, (error, response, body) => {
		if (error) return console.log(error);

		const htmlBody = body;
		const $ = cheerio.load(htmlBody);

		$('article').each((i, elem) => {
			let credits = [];
			$(elem).find('span.author').each((index, element) => {
				let name = $(element).children('a').text();
				let role = $(element).text().replace(name, '').trim();
				if (role === '') role = 'Words';
				let objCredits = { name, role };
				credits.push(objCredits);
			});
			let post = {
				postID: elem.attribs.id.replace('post-', ''),
				image: $(elem).find('img.wp-post-image')[0].attribs.src.replace(/\?(.*)/, ''),
				topic: $(elem).find('div.entry-topic a').html().trim(),
				title: $(elem).find('h2.entry-title a').html().trim(),
				link: $(elem).find('h2.entry-title a')[0].attribs.href,
				credits,
				postedOn: $(elem).find('time')[0].attribs.datetime
			};
			posts.push(post);
			posts.map(value => {
				postModel.findOneAndUpdate({ postID: value.postID }, value, { upsert: true }, (error, result) => {
					if (error) return console.log(`Insert Post error: ${error}`);
				});
			});
		});
	});

};

module.exports = scrapeMT;