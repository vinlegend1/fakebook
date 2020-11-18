const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const Post = require('../models/Post');
const mongoose = require('mongoose');

router.get('/all/friends', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user;

    User.findById(_id)
        .populate({
            path: 'friends',
            populate: {
                path: 'posts',
                model: 'Post'
            }
        })
        .exec((err, user) => {
            res.json(user.friends)
        });

});

router.get('/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username } = req.params;
    const post_id = req.query.id ? req.query.id : null;

    if (!post_id) {
        Post.find({ username }, (err, posts) => {
            res.json(posts);
        })
    } else {
        Post.find({ username, _id: post_id }, (err, posts) => {
            res.json(posts);
        })
    }

});

router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { title, body } = req.body;
    const user = req.user;
    const { username } = user;

    const newPost = new Post({
        title,
        body,
        postedBy: username
    });

    newPost.save((err, post) => {
        if (err) return res.status(500).json({ msgBody: "something went wrong", msgErr: true });
        User.findByIdAndUpdate(user._id, { $addToSet: { posts: post } }, (error, _) => {
            if (error) return res.status(500).json({ msgBody: "something went wrong", msgErr: true });
            res.json(post);
        });
    })

});

module.exports = router;