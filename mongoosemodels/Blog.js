const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    userId: Number,
    authorFirstName: String,
    authorLastName: String,
    content: String,
    date: Date,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
