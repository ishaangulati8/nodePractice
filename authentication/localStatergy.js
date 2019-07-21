const models = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStatergy = require('passport-local').Statergy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/**
 * LOCAL STATERGY
 */
passport.use(new LocalStatergy({
    userField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const user = await models.User.findOne({
            email,
        });
        if (!user) {
            return done(null, false, { message: 'Incorrect email' });
        }
        const match = bcrypt.compare(password, user.password);
        if (match) {
            return done(null, user);
        }
        return done(null, false, {message: `Email and Password don't match.`});

    } catch (error) {
        done(error);
    }
}
));

/**
 * TOKEN STATERGY
 */

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
    passReqToCallback:true,
}, async (req, jwtPayload, done) => {
    try {
        const isUser = await models.User.findById(jwtPayload.id);
        if (isUser) {
            done(null, isUser);
        } else {
            done(null, false, { message: 'User not found.' });
        }
    } catch (error) {
        done(error);
    }
}));

module.exports = passport;