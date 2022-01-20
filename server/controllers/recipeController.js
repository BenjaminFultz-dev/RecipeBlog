require('../../config/database');
const Recipe = require('../models/Recipe');

exports.showRecipe = async (req, res) => {
    try {
       let recipeId = req.params.id;
       let favorites = req.user.favorites;
       let isFavorite = Object.keys(favorites).includes(recipeId);
       const recipe = await Recipe.findById(recipeId);
       const isAuthenticated = req.isAuthenticated();
       res.render('recipe', { title: 'Chef\'s Kiss - Recipe', recipe, isAuthenticated, isFavorite }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}


exports.searchRecipe = async (req, res) => {

    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true }});
        const isAuthenticated = req.isAuthenticated();
        res.render('search', { title: 'Chef\'s Kiss - Search', recipe, isAuthenticated });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
}


exports.exploreLatest = async (req, res) => {
    try {
       const limitNumber = 20;
       const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)
       const isAuthenticated = req.isAuthenticated();
       res.render('explore-latest', { title: 'Chef\'s Kiss - Explore Latest', recipe, isAuthenticated }); 
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}


exports.exploreRandom = async (req, res) => {
    try {
       let count = await Recipe.find().countDocuments();
       let random = Math.floor(Math.random() * count);
       let recipe = await Recipe.findOne().skip(random).exec();
       const isAuthenticated = req.isAuthenticated();
       res.render('explore-random', { title: 'Chef\'s Kiss - Explore Random', recipe, isAuthenticated }); 
    } catch (error) {
       res.status(500).send({ message: error.message || "Error Occurred" });  
    }
}

exports.submitRecipe = async (req, res) => {
       const infoErrorsObj = req.flash('infoErrors');
       const infoSubmitObj = req.flash('infoSubmit');
       const isAuthenticated = req.isAuthenticated();
       res.render('submit-recipe', { title: 'Chef\'s Kiss - Submit Recipe', infoErrorsObj, infoSubmitObj, isAuthenticated }); 
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
          email: req.user.email,
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
//         await Category.insertOne({
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
            // name: "Canning & Freezing",
            // image: "canning.jpg"
//         },
//         {
//             name: "Breads",
//             image: "breads.jpg"
//         },

//         });
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDummyCategoryData();

