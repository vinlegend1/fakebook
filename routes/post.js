const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const Post = require('../models/Post');
const mongoose = require('mongoose');

// @todo
router.get('/all/friends', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user;
});

// @todo
router.get('/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username } = req.params;
    const { id } = req.query;

});

// @todo
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { title, body } = req.body;
    const user = req.user;
    const { username } = user;

});

module.exports = router;