var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var multipart = require('connect-multiparty');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    secret : 'myboard',
    resave : 'false',
    saveUninitialized :  true
}))
/* app.use(logger({
    formate : 'dev',
    stream : fs.createReadStream(__dirname + '/app.log', {'flags' : 'w'})
})); */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(multipart({
    uploadDir : __dirname +'/upload'
}))

app.use(express.static(path.join(__dirname, '/public/javascript')));
app.use(express.static(path.join(__dirname, '/public/stylesheets')));
app.use(express.static(path.join(__dirname, '/public/images')));
app.use('/upload', express.static(__dirname + '/upload'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
/* app.use('/board',boardRouter);
app.use('/member',memberRouter); */


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
