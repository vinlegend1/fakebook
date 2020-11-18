const passport = require('passport');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;

const cookieFromExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

passport.use(new JWTStrategy({
    jwtFromRequest: cookieFromExtractor,
    passReqToCallback: true,
    secretOrKey: "keyboard cat" // maybe wanna use environment variables here
}, (req, payload, done) => {
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err);

        if (!user) {
            return done(null, false);
        } else {
            req.user = user;
            return done(null, user);
        }
    })
}))

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }).select('+password').exec((err, user) => {
        if (err) return done(err);

        if (!user) return done(null, false);

        user.comparePassword(password, done);
    })
}));

