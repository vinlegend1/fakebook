const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const Post = require('../models/Post');

router.get('/all/friends', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user = req.user;
    let allFriendsPosts = [];
    for (let i = 0; i < user.friends.length; i++) {
        User.findById(user.friends[i], (err, friend) => {
            if (err) res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
            allFriendsPosts.push(friend.posts);
        });
    }

    res.json(allFriendsPosts);
});

router.get('/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username } = req.params;
    const { id } = req.query;

    if (!username) {
       return res.status(400).json({ msgBody: "Bad request", msgErr: true });
    }

    if (id) {
        Post.findOne({ _id: id }, (err, post) => {
            if (err) {
                return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
            }
            return res.status(200).json(post);
        });
    } else {
        Post.find({ postedBy: username }, (err, post) => {
            if (err) {
                return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
            }
            return res.status(200).json(post);
        });
    }
});

router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { title, body } = req.body;
    const user = req.user;
    const { username } = user;
    const post = new Post({
        title,
        body,
        postedBy: username
    });

    if (!user) {
       return res.status(400).json({ msgBody: "Bad request", msgErr: true });
    }

    User.findOneAndUpdate({ username }, { $push: { posts: post } }, { useFindAndModify: false }, (err, user) => {
        post.save((err) => {

            if (err) return res.status(500).json({ msgBody: "Error has occured", msgErr: true })
            else {
                return res.status(200).json({
                    post,
                    friends: user.friends
                })
            }
            
        })
    })

});

module.exports = router;