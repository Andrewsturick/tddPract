'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jwt-simple');

var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/redditClone';

var mongoose = require('mongoose');
mongoose.connect(mongoUrl, function(err) {
  if(err) return console.log('Error connecting to Mongodb', err);
  console.log('Connected to MongoDB: ', mongoUrl);
});

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));

app.use(function(req, res) {
  res.status(404).render('404');
});

app.listen(PORT, function() {
  console.log('Listening on port: ', PORT);
});

module.exports = app;