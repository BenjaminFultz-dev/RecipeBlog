require('../../config/database');
const { countDocuments } = require('../models/Category');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

exports.exploreCategories = async (req, res) => {
    try {
       const limitNumber = 20;
       const categories = await Category.find({}).limit(limitNumber);
       res.render('categories', { title: 'Chef\'s Kiss - Categories', categories }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}


exports.exploreCategoriesById = async (req, res) => {
    try {
       let categoryId = req.params.id;
       const limitNumber = 20;
       const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
       res.render('categories', { title: 'Chef\'s Kiss - Categories', categoryById }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}