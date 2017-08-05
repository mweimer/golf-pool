'use strict';
const config = require('../config/environment');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const {User} = require('../sqldb');

const validateJwt = expressJwt({
    secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
 function isAuthenticated() {
    return compose()
    // Validate jwt
    .use((req, res, next) => {
        // allow access_token to be passed through query parameter as well
        if(req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = `Bearer ${req.query.access_token}`;
        }
        // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
        if(req.query && typeof req.headers.authorization === 'undefined') {
            req.headers.authorization = `Bearer ${req.cookies.token}`;
        }
        validateJwt(req, res, next);
    })
    // Attach user to request
    .use((req, res, next) => {
        return User.find({ where: { id: req.user.id } })
        .then(user => {
            if(!user) {
                return res.status(401).end();
            }
            req.user = user;
            return next();
        })
        .catch(err => next(err));
    });
}

module.exports.isAuthenticated = isAuthenticated;

/**
 * Checks if the user role meets the minimum requirements of the route
 */
module.exports.hasRole = function(roleRequired) {
    if(!roleRequired) {
        throw new Error('Required role needs to be set');
    }

    return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
        if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
            return next();
        } else {
            return res.status(403).send('Forbidden');
        }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
module.exports.signToken = function(id, role, name) {
    return jwt.sign({ id, role, name }, config.secrets.session, {
        expiresIn: 60 * 60 * 24 * 4 // 4 days
    });
}

/**
 * Set token cookie directly for oAuth strategies
 */
module.exports.setTokenCookie = function(req, res) {
    if(!req.user) {
        return res.status(404).send('It looks like you aren\'t logged in, please try again.');
    }
    var token = signToken(req.user.id, req.user.role, req.user.name);
    res.cookie('token', token);
    res.redirect('/');
}
