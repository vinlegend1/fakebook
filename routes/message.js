const User = require('../models/User');
const passport = require("passport");
// const passportConfig = require("../passport.config");
const router = require('express').Router();
// const jwt = require('jsonwebtoken');
// const Post = require('../models/Post');
const Friend = require('../models/Friend');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send("ok");
});

module.exports = router;