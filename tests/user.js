'use strict'
var mocha = require('mocha')
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
chai.use(chaiHttp);



var app = require('../app');
var User = require('../../models/user');

var clearDb = function(done){
  User.remove({}, function(err) {
    done();
  });
};
