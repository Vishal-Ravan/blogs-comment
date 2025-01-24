const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // Field to store the path of the uploaded image
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the blog
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Related comments
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Blog', blogSchema);
