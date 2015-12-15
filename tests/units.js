'use strict'

var chai           = require('chai');
var chaiHttp       = require('chai-http');
var JWT            = require('jwt-simple')
var expect         = chai.expect;
var should         = chai.should();
var sync           = require('synchronize')
var mongoose       = require('mongoose');
var User           = require('../models/user.js')
var bcrypt         = require('bcryptjs');

// var Comment = require('../models/comment.js')



describe('this is testing the token function', function(){
  it('should to return a good token of the body', function(done){
      var username = 'someuser';
      var password = 'football';
      var user     =  new User ({username: username, password: password});
      var token    =  user.token();

      user   =  JWT.decode( token, process.env.JWT_SECRET )
      var usernameFromToken = user.username;

      usernameFromToken.should.equal(username);
      // expect(usernameFromToken).to.equal(username)
      done()
  })
})


describe('This to test that the user password is salted and compared accuratly', function() {
  it('should generate successful salted hashed incryption', function(done) {
    var user = {
      username: 'ammar',
      password: 'andrew'
    };
    User.register(user, function(err, genUser) {
      if(err) console.log('err ', err);
      bcrypt.compare(user.password, genUser.password, function(err, isCorrect) {
        expect(isCorrect).to.equal(true);
        // isCorrect.should.equal(true);
        done()
      });
    });
  });
});






