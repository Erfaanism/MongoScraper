const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	postID: {
		type: Number,
		required: true,
	},
	userName: {
		type: String,
		required: true
	},
	userIP: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Comment', commentSchema);