const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { ensureAuthenticated } = require('../../config/auth');

router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.showRecipe);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', ensureAuthenticated, recipeController.submitRecipe);
router.post('/submit-recipe', ensureAuthenticated, recipeController.submitRecipeOnPost);


module.exports = router;