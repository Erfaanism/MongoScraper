const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
	postID: {
		type: Number,
		required: true,
	},
	authorIP: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = model('Comment', commentSchema);