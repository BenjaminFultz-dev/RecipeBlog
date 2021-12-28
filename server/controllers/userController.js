require('../../config/database');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

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