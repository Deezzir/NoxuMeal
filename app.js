const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const exphbs = require("express-handlebars");

const app = express();

const index = require('./routes/index');
const post = require('./routes/post');


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

app.use('/', index);
app.use('/', post)

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

