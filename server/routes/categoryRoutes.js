const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/categories', categoryController.exploreCategories);
router.get('/categories:id', categoryController.exploreCategoriesById);

module.exports = router;