require('dotenv').config();  // Load environment variables at the very top
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )
var logger = require('morgan');
var mongoose = require('mongoose');

// Import routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var electronicsRouter = require('./routes/electronics');  // Electronics router
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');  // Resource router

// Initialize express app
var app = express();

// MongoDB connection setup
const connectionString = process.env.MONGO_CON;
console.log("MongoDB URI:", connectionString);

mongoose.connect(connectionString);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connection to MongoDB Atlas succeeded');
});

// Model setup (using Electronics model)
const Electronics = require('./models/electronics');  // Import your model from models directory

// Seed the database
async function recreateDB() {
  await Electronics.deleteMany();

  let electronics1 = new Electronics({ name: "Smartphone", category: "Mobile", price: 699 });
  let electronics2 = new Electronics({ name: "Laptop", category: "Computing", price: 1200 });
  let electronics3 = new Electronics({ name: "Smartwatch", category: "Wearable", price: 400 });

  await electronics1.save();
  await electronics2.save();
  await electronics3.save();

  console.log("Database seeded with sample electronics");
}

let reseed = true;
db.once('open', async () => {
  if (reseed) { await recreateDB(); }
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  var Account = require('./models/account');
  passport.use(new LocalStrategy(Account.authenticate()));
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/electronics', electronicsRouter);  
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource', resourceRouter);  // Register resource router

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;