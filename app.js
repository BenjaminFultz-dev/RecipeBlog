const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const passport = require('passport');
const connectDB = require('./config/database');
const recipeRoutes = require('./server/routes/recipeRoutes.js');
const categoryRoutes = require('./server/routes/categoryRoutes.js');
const userRoutes = require('./server/routes/userRoutes.js');

require('./config/passport')(passport);
require('dotenv').config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.urlencoded( {extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cookieParser('RecipeBlogSecure'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(fileUpload());


app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use('/', recipeRoutes, categoryRoutes, userRoutes);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));