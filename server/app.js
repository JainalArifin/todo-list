var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');
var todo = require('./routes/todo');

var app = express();
app.use(cors())

mongoose.connect('mongodb://localhost/todolist', (err)=>{
  if(!err) console.log('Database sudah terhubung');
  else console.log('Database sudah terhubung');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', users);
app.use('/todo', todo);


module.exports = app;
