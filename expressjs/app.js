var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sites', express.static(path.join(__dirname, 'views/sites')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const ejs = require('ejs')
const axios = require('axios')
const instance = axios.create({
  baseURL: 'https://be.mockapi.codeby.com/api/restful',
  headers: {
    'Accept': 'application/json',
    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhc2V0X2lkIjoiMTMiLCJ1c2VyX2lkIjo0fQ.6UUHpn4pHnIlrxig3cm8WTwybE_SfkiVbJAdYl4NdVs"
  }
});
app.get('/sites/:site/:view?', async function (req, res) {
  const { site, view } = req.params
  const path_view = app.get('views') + `/sites/${site}/${view ?? 'index'}.ejs`
  const html = await ejs.renderFile(path_view, { instance, app }, { async: true });
  res.send(html);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

console.log('http://localhost:3000/sites/thegioididong');
