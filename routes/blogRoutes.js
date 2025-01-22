const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, updateBlog, deleteBlog,getBlogById } = require('../controllers/blogController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, createBlog);
router.get('/', getBlogById);
router.get('/:id', getBlogs);
router.put('/:id', authMiddleware, adminMiddleware, updateBlog);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBlog);

module.exports = router;
