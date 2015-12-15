'use strict'
// var mocha = require('mocha')
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
chai.use(chaiHttp);

var app = require('../app');
var User = require('../models/user');

describe('user routes', function(){
  describe('posting to user route', function(){
    it('should return the user we add to db on db callback',function(done){
        var user = "ammar";
        var password = "boob"
        chai.request(app)
        .post('/users')
        .send({username: user, password: password})
        .end(function(err, response){
           expect(res.body.username).to.be(user)
           expect(res.body.password).to.be(password)
        })

      done()
    })



  })
})
