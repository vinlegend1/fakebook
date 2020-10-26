const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const mongoose = require('mongoose');
// const Friend = require('../models/Friend');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user;

    User.find({
        'friends': { $in: [mongoose.Types.ObjectId(_id)] }
    }, (err, friends) => {
            // console.log(friends);
            let arrOfFriends = [];
            for (let i = 0; i < friends.length; i++) {
                arrOfFriends.push({
                    posts: friends[i].posts,
                    friends: friends[i].friends,
                    messages: friends[i].messages,
                    username: friends[i].username,
                    _id: friends[i]._id
                })
            }
            return res.status(200).json(arrOfFriends)
    });

    // console.log(req.user._id);
});

router.put('/request', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.query;
    const thisUser = req.user;

    // const friend = new User(user)

    if (!thisUser) {
       return res.status(400).json({ msgBody: "Bad request", msgErr: true });
    }

    if (id == thisUser._id) {
        return res.status(400).json({ msgBody: "You can't friend yourself, loner!", msgErr: true });
    }

    User.findOneAndUpdate({ _id: id }, { $addToSet: { friendRequest: thisUser } }, { useFindAndModify: false }, (err, user) => {

            return res.json({
                msgBody: "Friend request sent",
                msgErr: false
            });
    })

});

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