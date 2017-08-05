const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function localAuthenticate (User, email, password, done) {
    return User.find({
        where: {
            email: email.toLowerCase()
        }
    })
    .then(user => {
        if (!user) {
            return done(null, false, {
                message: 'This email is not registered.'
            });
        }
        return user.authenticate(password).then(authenticated => {
            if (!authenticated) {
                return done(null, false, { message: 'This password is not correct.' });
            } else {
                return done(null, user);
            }
        }).catch(authError => done(authError));
    })
    .catch(err => done(err));
}

module.exports.setup = function(User/*, config */) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, (email, password, done) => {
        return localAuthenticate(User, email, password, done);
    }));
}
