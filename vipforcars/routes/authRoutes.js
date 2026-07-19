const express = require('express');
const router = express.Router();
const {renderLogin, login, logout } = require('../controllers/authController');

router.get('/login', renderLogin); // Add this line to show the page
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
