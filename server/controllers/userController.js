require('../../config/database');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Recipe = require('../models/Recipe');

exports.login = async (req, res) => {
    const infoSubmitObj = req.flash('infoSubmit');
    const isAuthenticated = req.isAuthenticated();
    const errors = req.flash('error');
    res.render('login', { title: 'Chef\'s Kiss - Login', errors, infoSubmitObj, isAuthenticated });
  }
  
  exports.loginOnPost = (req, res, next) => {
      passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);    
  }
    
  
  exports.register = (req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const isAuthenticated = req.isAuthenticated();
    res.render('register', { title: 'Chef\'s Kiss - Register', infoErrorsObj, isAuthenticated }); 
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

  exports.dashboard = async (req, res) => {
    try {
      let email = req.user.email;
      const limitNumber = 5;
      let favorites = await Recipe.find( { _id : { $in : Object.keys(req.user.favorites) }}).limit(limitNumber);
      const submittedRecipes = await Recipe.find({ 'email': email }).limit(limitNumber);
      const isAuthenticated = req.isAuthenticated();
      res.render('dashboard', { title: 'Chef\'s Kiss - Dashboard', user: req.user, isAuthenticated, submittedRecipes, favorites });  
    } catch (error) {
      req.flash('infoErrors', error);
    }
    
  }

  exports.logout = (req, res) => {
    req.logout()
    res.redirect('/login')
  }

  exports.addFavorite = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (typeof user.favorites === 'undefined') {
        user.favorites = {}
      }
      user.favorites[req.params.id] = true;
      user.markModified('favorites');
      await user.save();
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  exports.favoriteRecipes = async (req, res) => {
    let favorites = await Recipe.find( { _id : { $in : Object.keys(req.user.favorites) }})
    const isAuthenticated = req.isAuthenticated();
    res.render('favorite-recipes', { title: 'Chef\'s Kiss - Favorite Recipes', user: req.user, isAuthenticated, favorites });
  }

  exports.submittedRecipes = async (req, res) => {
    let email = req.user.email;
    const submittedRecipes = await Recipe.find({ 'email': email })
    const isAuthenticated = req.isAuthenticated();
    res.render('submitted-recipes', { title: 'Chef\'s Kiss - Submitted Recipes', user: req.user, isAuthenticated, submittedRecipes });
  }
