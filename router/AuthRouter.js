// AuthRouter.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.get('/auth/google', AuthController.loginWithGoogle);
router.get('/auth/google/callback', AuthController.googleCallback);
router.get('/auth/profile', AuthController.report);

module.exports = router;
