const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: Number,
    userFirstName: String,
    userLastName: String,
    blogId: {
        type: Schema.type.ObjectId,
        ref: 'Blog',
    },
    text: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;