'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

router.post('/', function(req, res){
  User.create(req.body, function(err, user){
    res.send(user);
  })
})


router.get('/:name', function(req, res){
    User.find({username: req.params.name}, function(err, user){
    res.send(user);
  })
})




module.exports = router;
