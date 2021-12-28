const mongoose = require('mongoose');
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected')
});

require('../server/models/Category');
require('../server/models/Recipe');
// require('../server/models/User');