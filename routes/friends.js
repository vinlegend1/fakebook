const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const mongoose = require('mongoose');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user;
    User.findById(_id)
        .populate('friends')
        .exec((err, user) => {
            if (err) return res.status(500).json({ msgBody: "something went wrong", msgErr: true });
            res.json(user.friends);
        })

});

router.put('/request', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.query;
    const thisUser = req.user;

    try {
        await User.findByIdAndUpdate(id, { $addToSet: { friendRequest: thisUser } })
        res.json({
            msgBody: "friend request sent",
            msgErr: false
        })
    } catch (e) {
        // console.log(e);
        return res.status(500).json({ msgBody: "something went wrong", msgErr: true })
    }
});

// @todo
router.put('/request/accept', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.query;
    const thisUser = req.user;

    if (!thisUser || !id) {
        return res.status(400).json({ msgBody: "Bad request", msgErr: true });
    }

    User.findByIdAndUpdate(thisUser._id, { $addToSet: { friends: mongoose.Types.ObjectId(id) }, $pull: { friendRequest: mongoose.Types.ObjectId(id) } }, { useFindAndModify: false }, (err, thisUser) => {

        User.findByIdAndUpdate(id, { $addToSet: { friends: thisUser } }, { useFindAndModify: false }, (err, user) => {
            console.log(user);
            return res.json({
                msgBody: "Friend request accepted",
                msgErr: false
            });
        })

    })

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