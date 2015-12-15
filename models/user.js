'use strict';

var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var jwt        = require('jwt-simple')
// var bCrypt     = require('brypct')
var bcrypt = require('bcryptjs');
var User;

var userSchema = Schema({
  username     : {
      type     : String
    , required : true
    , unique   : true
    },

   password    : {
      type     : String
    , required : true
    }
});

userSchema.methods.token = function(){
    var payload           = {};
    payload.id            = this._id;
    payload.username      = this.username;
    payload.password      = this.password;
    var token             = jwt.encode(payload, process.env.JWT_SECRET)
    return token

}

// userSchema.method.register = function() {
//   bcrypt.genSalt(10, function(err, salt) {
//       if(err) console.error('err genSalt ', err);
//       bcrypt.hash(this.password, salt, function(err, hash) {
//         if(err) console.error('err hash ', err);
//         this.password = hash;
//         this.save(function(err, savedUser) {
//           if(err || savedUser) return (err || savedUser);
//         });
//       });
//     });
// };

userSchema.statics.register = function(user, cb) {
  bcrypt.genSalt(10, function(err1, salt) {
      bcrypt.hash(user.password, salt, function(err2, hash) {
        if(err1 || err2) console.error('err ', err1 || err2);
        var newUser = new User();
        newUser.username = user.username;
        newUser.password = hash;
        newUser.save(function(err, savedUser) {
          cb(err, savedUser);
        });
      });
    });
};



User = mongoose.model('User', userSchema);

module.exports = User;
