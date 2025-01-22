const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// Add a comment
exports.addComment = async (req, res) => {
    const { blogId, content } = req.body;

    try {
        const blog = await Blog.findById(blogId);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const newComment = new Comment({
            content,
            author: req.user._id,
            blog: blogId,
        });

        await newComment.save();

        blog.comments.push(newComment._id);
        await blog.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment' });
    }
};

// Add a reply to a comment
exports.addReply = async (req, res) => {
    const { commentId, content } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const newReply = new Comment({
            content,
            author: req.user._id,
            blog: comment.blog,
            replies: [commentId]
        });

        await newReply.save();

        comment.replies.push(newReply._id);
        await comment.save();

        res.status(201).json(newReply);
    } catch (error) {
        res.status(500).json({ message: 'Error adding reply' });
    }
};
