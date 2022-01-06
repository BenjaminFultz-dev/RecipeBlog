const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../../config/auth');

router.get('/login', userController.login);
router.post('/login', userController.loginOnPost);
router.get('/register', userController.register);
router.post('/register', userController.registerOnPost);
router.get('/dashboard', ensureAuthenticated, userController.dashboard);
router.get('/logout', ensureAuthenticated, userController.logout);
router.post('/recipe/favorites', ensureAuthenticated, userController.addFavorite);
router.delete('/recipe/favorites', ensureAuthenticated, userController.removeFavorite);
router.get('/favorite-recipes', ensureAuthenticated, userController.favoriteRecipes);
router.get('/submitted-recipes', ensureAuthenticated, userController.submittedRecipes);

module.exports = router;