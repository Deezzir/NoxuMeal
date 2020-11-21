const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose')
const session = require('express-session');
const exphbs = require('express-handlebars');

const MongoStore = require('connect-mongo')(session);

const app = express();

const index = require('./routes/index');
const post = require('./routes/post');

app.set('trust proxy', 1);

// view engine setup
app.engine('.hbs', exphbs({
  extname: '.hbs' ,
  helpers: {
    layoutsDir: './views/layouts',
    },
  defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser : true,
  useUnifiedTopology :true,
  useCreateIndex : true
})
    .then(() => {
      console.log("Connected to DB");
    })
    .catch(error => {
      console.log(`Error while connecting: ${error}`);
    });


app.use(session({
  cookie: {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 5 * 24 * 60 * 60,
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));


app.use(function(req,res,next){
  if(!req.session){
    return next(new Error('Error occured while creating a session'))
  }
  res.locals.user = req.session.user;
  next();
});

app.use('/', index);
app.use('/', post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

