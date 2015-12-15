'use strict';

var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var jwt        = require('jwt-simple')
// var bCrypt     = require('brypct')
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


User = mongoose.model('User', userSchema);

module.exports = User;
