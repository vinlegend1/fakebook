const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const Post = require('../models/Post');
const mongoose = require('mongoose');

// SOmething wrong here too...
router.get('/all/friends', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user;
    // console.log("id: " + _id);
    let allFriendsPosts = [];
    User.find({'friends': { $in: [mongoose.Types.ObjectId(_id)] }}, async (err, friends) => {
        // console.log(friends);
        if (err) res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
        for (let i = 0; i < friends.length; i++) {
            await Post.find({ postedBy: friends[i].username }, (err, posts) => {
                // console.log(posts)
                if (err) {
                    return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
                }
                allFriendsPosts.push({
                    posts: posts,
                    username: friends[i].username,
                    _id: friends[i]._id
                })
            });
            
        }
        console.log(allFriendsPosts)
        return res.status(200).json(allFriendsPosts)
    });
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
                    msgBody: "Posted just now",
                    msgErr: false
                })
            }
            
        })
    })

});

module.exports = router;