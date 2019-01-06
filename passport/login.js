var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user.model');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                    if (err)
                        return done(err);
                    if (!user){
                        return done(null, false, req.flash('message', 'User does not exist'));
                    }
                    if (!isValidPassword(user, password)){
                        return done(null, false, req.flash('message', 'Invalid password')); // redirect back to login page
                    }
                    return done(null, user);
                }
            );

        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
}