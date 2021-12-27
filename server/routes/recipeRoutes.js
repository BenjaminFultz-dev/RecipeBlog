const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { ensureAuthenticated } = require('../../config/auth');

router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.get('/recipe/:id', recipeController.showRecipe);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);
router.get('/login', recipeController.login);
router.post('/login', recipeController.loginOnPost);
router.get('/register', recipeController.register);
router.post('/register', recipeController.registerOnPost);

module.exports = router;