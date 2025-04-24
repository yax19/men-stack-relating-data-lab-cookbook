// server.js
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();

const authController = require('./controllers/auth');
const foodsController = require('./controllers/foods');
const usersController = require('./controllers/users');
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');
mongoose.connect('mongodb://localhost:27017/cookbook-app')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passUserToView);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/foods', foodsController);
app.use('/users', usersController);

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
