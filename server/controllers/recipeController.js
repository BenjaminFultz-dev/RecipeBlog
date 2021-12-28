require('../../config/database');
const { countDocuments } = require('../models/Category');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.homepage = async (req, res) => {
    try {
       const limitNumber = 5;
       const categories = await Category.find({}).limit(limitNumber);
       const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
       const appetizers = await Recipe.find({ 'category': 'Appetizers' }).limit(limitNumber);
       const breakfast = await Recipe.find({ 'category': 'Breakfast' }).limit(limitNumber);
       const lunch = await Recipe.find({ 'category': 'Lunch' }).limit(limitNumber);
       const food = { latest, appetizers, breakfast, lunch };
       res.render('index', { title: 'Chef\'s Kiss - Home', categories, food }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}


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


exports.showRecipe = async (req, res) => {
    try {
       let recipeId = req.params.id;
       const recipe = await Recipe.findById(recipeId);
       res.render('recipe', { title: 'Chef\'s Kiss - Recipe', recipe }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}


exports.searchRecipe = async (req, res) => {

    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true }});
        res.render('search', { title: 'Chef\'s Kiss - Search', recipe });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
}


exports.exploreLatest = async (req, res) => {
    try {
       const limitNumber = 20;
       const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)
       res.render('explore-latest', { title: 'Chef\'s Kiss - Explore Latest', recipe }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}


exports.exploreRandom = async (req, res) => {
    try {
       let count = await Recipe.find().countDocuments();
       let random = Math.floor(Math.random() * count);
       let recipe = await Recipe.findOne().skip(random).exec();
       res.render('explore-random', { title: 'Chef\'s Kiss - Explore Random', recipe }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}

exports.submitRecipe = async (req, res) => {
       const infoErrorsObj = req.flash('infoErrors');
       const infoSubmitObj = req.flash('infoSubmit');
       res.render('submit-recipe', { title: 'Chef\'s Kiss - Submit Recipe', infoErrorsObj, infoSubmitObj }); 
}


exports.submitRecipeOnPost = async (req, res) => {
    try {
      let imageUploadFile;
      let uploadPath;
      let newImageName;

      if (!req.files || Object.keys(req.files).length === 0) {
          console.log('No files were uploaded.');
      } else {
          imageUploadFile = req.files.image;
          newImageName = Date.now() + imageUploadFile.name;

          uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

          imageUploadFile.mv(uploadPath, function(err) {
              if(err) return res.status(500).send(err);
          })
      }
      const newRecipe = new Recipe({
          name: req.body.name,
          description: req.body.description,
          email: req.body.email,
          ingredients: req.body.ingredients,
          instructions: req.body.instructions,
          category: req.body.category,
          image: newImageName
      });

      await newRecipe.save();

      req.flash('infoSubmit', 'Recipe has been added.');
      res.redirect('/submit-recipe');  
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/submit-recipe');
    }    
}


exports.login = async (req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('login', { title: 'Chef\'s Kiss - Login', infoErrorsObj, infoSubmitObj });
}

exports.loginOnPost = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next); 
}

exports.register = (req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  res.render('register', { title: 'Chef\'s Kiss - Register', infoErrorsObj }); 
}

exports.registerOnPost = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });

    await newUser.save();
    req.flash('infoSubmit', 'User successfully registered. Login with your email and password.');
    res.redirect('/login')
  } catch (error) {
    req.flash('infoErrors', error);
    res.redirect('/register');
  }
}

// async function updateRecipe() {
//     try {
//         const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//         res.n; //Number of documents matched
//         res.nModified; //Number of documents modified
//     } catch (error) {
//         console.log(error)
//     }
// }

// async function deleteRecipe() {
//     try {
//         await Recipe.deleteOne({ name: 'New Recipe Updated'})
//     } catch (error) {
//         console.log(error);
//     }
// }



// async function insertDummyCategoryData() {
//     try {
//         await Category.insertMany([{
//             name: "Breakfast",
//             image: "breakfast.jpg"
//         },
//         {
//             name: "Lunch",
//             image: "lunch.jpg"
//         },
//         {
//             name: "Beverages",
//             image: "beverages.jpg"
//         },
//         {
//             name: "Appetizers",
//             image: "appetizers.jpg"
//         },
//         {
//             name: "Soups",
//             image: "soups.jpg"
//         },
//         {
//             name: "Salads",
//             image: "salads.jpg"
//         },
//         {
//             name: "Entrees: Beef",
//             image: "beef.jpg"
//         },
//         {
//             name: "Entrees: Poultry",
//             image: "poultry.jpg"
//         },
//         {
//             name: "Entrees: Pork",
//             image: "pork.jpg"
//         },
//         {
//             name: "Entrees: Seafood",
//             image: "seafood.jpg"
//         },
//         {
//             name: "Entrees: Vegetarian",
//             image: "vegetarian.jpg"
//         },
//         {
//             name: "Side Dishes: Vegetables",
//             image: "sidevegetables.jpg"
//         },
//         {
//             name: "Side Dishes: Other",
//             image: "sideother.jpg"
//         },
//         {
//             name: "Desserts",
//             image: "desserts.jpg"
//         },
//         {
//             name: "Canning/Freezing",
//             image: "canning.jpg"
//         },
//         {
//             name: "Breads",
//             image: "breads.jpg"
//         },

//     ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDummyCategoryData();

