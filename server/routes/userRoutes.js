const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../../config/auth');

router.get('/login', userController.login);
router.post('/login', userController.loginOnPost);
router.get('/register', userController.register);
router.post('/register', userController.registerOnPost);
router.get('/dashboard', ensureAuthenticated, userController.dashboard);
router.post('/dashboard', ensureAuthenticated, userController.logout);
router.post('/recipe/:id/favorite', ensureAuthenticated, userController.addFavorite);

module.exports = router;