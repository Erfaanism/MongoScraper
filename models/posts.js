const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	postID: {
		type: Number,
		required: true,
		index: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	authorName: {
		type: String,
		required: true
	},
	authorLink: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;