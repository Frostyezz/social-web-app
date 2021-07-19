const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: String,
    title: String,
    description: String,
    imgURL: String,
    boosts: Number,
    boosters: [String],
    creationDate: Date
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;