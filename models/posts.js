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
	topic: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	credits: {
		type: Array,
		required: true,
		default: []
	},
	postedOn: {
		type: Date,
		required: true
	}
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;