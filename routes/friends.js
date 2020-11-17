const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const mongoose = require('mongoose');

// @todo
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user;

});

// @todo
router.put('/request', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.query;
    const thisUser = req.user;

});

// @todo
router.put('/request/accept', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.query;
    const thisUser = req.user;



});

// router.get('/find/:username', passport.authenticate('jwt', { session: false }), (req, res) => {

//     res.send('ok');
//     const { username } = req.params;
//     const user = req.user;

//     if (!user.username) {
//        return res.status(400).json({ msgBody: "Bad request", msgErr: true });
//     }

//     User.find({ username: user.username, 'friends': { $in: [username] } }, (err, user) => {
//         console.log(user);
//         res.send('ok')
//     });

// });

module.exports = router;