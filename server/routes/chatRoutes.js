const express = require('express');
const router = express.Router();
const { getAllMessages, sendMessage, createGroup, addUserToGroup } = require('../controllers/chatController');
const authenticateToken = require('../middleware/auth');

router.get('/groups/:groupId/messages', authenticateToken, getAllMessages);
router.post('/groups/:groupId/messages', authenticateToken, sendMessage);
router.post('/groups', authenticateToken, createGroup);
router.post('/groups/add-user', authenticateToken, addUserToGroup);

module.exports = router;
