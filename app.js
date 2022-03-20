const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const collegeRouter = require('./routes/college');
const studentsRouter = require('./routes/students');
const vocationalRouter = require('./routes/vocational');
const counselorRouter = require('./routes/counselor');
const classRouter = require('./routes/class');
const hostelRouter = require('./routes/hostel');
const cors = require('cors')
const bodyParser = require('body-parser');
const ServerConf=require("./config/serverConfig");
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 解决post跨域问题，让options快速返回
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); //让options请求快速返回
  }
  else {
    next();
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/college', collegeRouter);
app.use('/api/students', studentsRouter);
app.use('/api/vocational', vocationalRouter);
app.use('/api/counselor', counselorRouter);
app.use('/api/class', classRouter);
app.use('/api/hostel', hostelRouter);

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
process.env.PORT=ServerConf.ServicePort

module.exports = app;
