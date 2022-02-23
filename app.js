var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts'); 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');  
const sessions = require('express-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tutorialsRouter = require('./routes/tutorials');
var adminRouter = require('./routes/admin');

require('dotenv').config();

var app = express();

app.locals.baseURL = process.env.BASE_URL + ":" + process.env.APP_PORT; 

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', './layouts/index')
app.set("layout login", false);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session SETUP
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay * 2 },
    resave: true,
    secure: true,
}));

app.use(flash());
//Global varibales
//Flash Session Massage
app.use(function (req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tutorials', tutorialsRouter);
app.use('/admin', adminRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.APP_STATUS === 'development' ? err : {};
  // render the error page
  console.log(res.locals.error);
  res.status(err.status || 500);
  res.render('error', {title:"ERROR", layout:false});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.session);
  next(createError(404));
});

module.exports = app;