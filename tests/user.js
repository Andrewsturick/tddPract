'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../app');
var User = require('../models/user');



var clearDb = function(){
  User.remove({}, function(err) {
  });
};


describe('user routes', function(){
  describe('posting to user route', function(){
    clearDb();
    it('should return the user we add to db on db callback',function(done){
        var user = "alicia";
        var password = "boadfadfob"
        chai.request(app)
        .post('/users')
        .send({username: user, password: password})
        .end(function(err, res){
          // console.log(res);
           expect(res.body.username).to.equal(user)
           expect(res.body.password).to.equal(password)
           done();
        })
    })
  });
  describe('get one user', function(){
    it('should return the specific user we are looking for', function(done){
      var user = "alicia"
      chai.request(app)
      .get(`/users/${user}`)
      .end(function(err, res){
          // expect(err).to.be(null)
          console.log(res.body[0].username);
          expect(res.body[0].username).to.equal(user)
      done();
      })
    })
  })
});
