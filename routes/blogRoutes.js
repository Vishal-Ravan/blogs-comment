const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, updateBlog, deleteBlog, getBlogById } = require('../controllers/blogController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');  // Ensure this is importing correctly

// Create a new blog (only admin)
router.post('/', upload.single('image'), authMiddleware, adminMiddleware, createBlog);

// Get all blogs
router.get('/', getBlogs);

// Get a single blog by ID
router.get('/:id', getBlogById);

// Update a blog (only admin)
router.put('/:id', upload.single('image'), authMiddleware, adminMiddleware, updateBlog);

// Delete a blog (only admin)
router.delete('/:id', authMiddleware, adminMiddleware, deleteBlog);

module.exports = router;
