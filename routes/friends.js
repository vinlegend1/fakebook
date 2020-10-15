const User = require('../models/User');
const passport = require("passport");
// const passportConfig = require("../passport.config");
const router = require('express').Router();
// const jwt = require('jsonwebtoken');
// const Post = require('../models/Post');
const Friend = require('../models/Friend');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user;

    User.findById(_id, (err, user) => {
        if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
        if (!user) return res.status(400).json({ msgBody: "Bad request", msgErr: true });
        return res.status(200).json(user.friends);
    })
});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params;
    const user = req.user;

    if (!username) {
       return res.status(400).json({ msgBody: "Bad request", msgErr: true });
    }

    User.find({ username: user.username }, (err, user) => {
        if (err) {
            return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
        }
        return res.status(200).json({
            friend: user.friends.filter(friend => friend === id)
        });
    });

});

router.post('/request', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { user } = req.body;
    const thisUser = req.user;

    // const friend = new Friend({
    //     username: user
    // })

    // if (!thisUser || !user) {
    //    return res.status(400).json({ msgBody: "Bad request", msgErr: true });
    // }

    // User.findOneAndUpdate({ username: thisUser.username }, { $push: { friends: friend } }, { useFindAndModify: false }, (err, thisUser) => {

    //     User.findByIdAndUpdate({ username: user.username }, { $push: { friends: thisUser } }, { useFindAndModify: false }, (err, user) => {
    //         return res.json({
    //             message: "Friend request accepted",
    //             error: false
    //         });
    //     })

    // })

});

router.post('/request/accept', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { user } = req.body;
    const thisUser = req.user;

    const friend = new Friend({
        username: user
    })

    if (!thisUser || !user) {
       return res.status(400).json({ msgBody: "Bad request", msgErr: true });
    }

    User.findOneAndUpdate({ username: thisUser.username }, { $push: { friends: friend } }, { useFindAndModify: false }, (err, thisUser) => {

        User.findByIdAndUpdate({ username: user.username }, { $push: { friends: thisUser } }, { useFindAndModify: false }, (err, user) => {
            return res.json({
                message: "Friend request accepted",
                error: false
            });
        })

    })

});

module.exports = router;