const { Schema, model } = require('mongoose');

const postSchema = new Schema({
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
	byline: {
		type: Array,
		required: true,
		default: []
	},
	postedon: {
		type: Date,
		required: true
	}
});

module.exports = model('Post', postSchema);