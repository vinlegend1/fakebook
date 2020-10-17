const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const jwt = require('jsonwebtoken');
// require('../passport.config')

const signToken = userID => {
    return jwt.sign({
        iss: "keyboard cat",
        sub: userID
    }, "keyboard cat", { expiresIn: "1hr" });
}

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msgBody: "Go fuck yourself, mate", msgErr: true });
    }

    User.findOne({ username }, (err, user) => {
        if (err) {
            return res.status(500).json({ msgBody: "Error has occured", msgErr: true });
        }
        if (user) {
            return res.status(400).json({ msgBody: "username already taken", msgErr: true });
        } else {
            const user = new User({
                username,
                password,
            });
            user.save((err) => {
                if (err) return res.status(500).json({ msgBody: "Error has occured", msgErr: true })
                else {
                    return res.status(201).json({ msgBody: "Account successfully created", msgErr: false })
                }
            })
        }
    })
    
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: "none" });
        console.log(token);
        res.status(200).json({
            isAuthenticated: true,
            user: {
                username
            }
        });
    }
});

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    // console.log('clear')
    return res.json({
        user: {
            username: "",
            role: ""
        },
        success: true
    })
});

router.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({
        isAuthenticated: true,
        user: {
            username,
            role
        }
    });
});

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.find({}, (err, users) => {
        let userObj = [];
        for (let i = 0; i < users.length; i++) {
            userObj.push({
                username: users[i].username,
                posts: users[i].posts,
                friends: users[i].friends
            })
        }
        console.log(users);
        res.status(200).json(userObj);
    })
})

module.exports = router;