const Blog = require('../models/Blog');
const User = require('../models/User');

// Create a new blog (only admin)
exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Get the image path from multer

    try {
        const newBlog = new Blog({
            title,
            content,
            author: req.user._id,
            image,  // Add image field
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog post' });
    }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username').populate('likes', 'username').populate('comments');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs' });
    }
};

// Update blog (only admin)
exports.updateBlog = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Get the image path from multer if file uploaded

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.image = image || blog.image;  // Update image if new image is uploaded

        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog post' });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the blog by ID and populate the author, likes, and comments fields
        const blog = await Blog.findById(id)
            .populate('author', 'username')  // Populate the author with their username
            .populate('likes', 'username')   // Populate likes with their usernames
            .populate('comments');           // Populate the comments array

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog' });
    }
};

// Delete blog (only admin)
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        await blog.remove();
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog post' });
    }
};
