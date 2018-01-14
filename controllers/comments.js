const commentsModel = require('../models/comments');

const postComment = (postID, authorIP, comment) => {
	commentsModel.find({ postID });
};

module.exports = { postComment };