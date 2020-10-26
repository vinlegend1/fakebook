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
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
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
            username: ""
        },
        success: true
    })
});

router.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username } = req.user;
    res.status(200).json({
        isAuthenticated: true,
        user: {
            username
        }
    });
});

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.find({}, (err, users) => {
        let userObj = [];
        for (let i = 0; i < users.length; i++) {
            userObj.push({
                username: users[i].username,
                id: users[i]._id,
                posts: users[i].posts,
                friends: users[i].friends
            })
        }
        // console.log(users);
        res.status(200).json(userObj);
    })
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params;

    User.findById(id, (err, user) => {
        if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
        if (!user) return res.status(400).json({ msgBody: "Bad request", msgErr: true });
        return res.status(200).json({
            username: user.username,
            id: user._id
        });
    })
})

module.exports = router;