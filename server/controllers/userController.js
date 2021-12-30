require('../../config/database');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

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
      const isAuthenticated = req.isAuthenticated();
      res.render('dashboard', { title: 'Chef\'s Kiss - Dashboard', user: req.user, isAuthenticated });  
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
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { favorites: req.params.id }
      )
      res.redirect('/dashboard')
    } catch (error) {
      
    }
  }
