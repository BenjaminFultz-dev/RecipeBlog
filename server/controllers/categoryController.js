require('../../config/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

exports.exploreCategories = async (req, res) => {
    try {
       const limitNumber = 20;
       const categories = await Category.find({}).limit(limitNumber);
       const isAuthenticated = req.isAuthenticated();
       res.render('category/index', { title: 'Chef\'s Kiss - Categories', categories, isAuthenticated }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}


exports.exploreCategoriesByName = async (req, res) => {
    try {
       let categoryName = req.params.name;
       const limitNumber = 20;
       const recipes = await Recipe.find({ 'category': categoryName }).limit(limitNumber);
       const isAuthenticated = req.isAuthenticated();
       res.render('category/show', { title: 'Chef\'s Kiss - Categories', recipes, categoryName, isAuthenticated }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}