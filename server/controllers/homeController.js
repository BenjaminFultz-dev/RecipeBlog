require('../../config/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');


exports.homepage = async (req, res) => {
    try {
       const limitNumber = 5;
       const categories = await Category.find({}).limit(limitNumber);
       const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
       const appetizers = await Recipe.find({ 'category': 'Appetizers' }).limit(limitNumber);
       const breakfast = await Recipe.find({ 'category': 'Breakfast' }).limit(limitNumber);
       const lunch = await Recipe.find({ 'category': 'Lunch' }).limit(limitNumber);
       const food = { latest, appetizers, breakfast, lunch };
       const isAuthenticated = req.isAuthenticated();
       res.render('index', { title: 'Chef\'s Kiss - Home', categories, food, isAuthenticated }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}