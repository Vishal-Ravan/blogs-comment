const express = require('express');
const router = express.Router();
const { addComment, addReply } = require('../controllers/commentController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/comment', authMiddleware, addComment);
router.post('/reply', authMiddleware, addReply);

module.exports = router;
