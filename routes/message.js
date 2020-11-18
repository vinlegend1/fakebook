const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const Message = require('../models/Message');

// @todo
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user = req.user;

});

// @todo
router.post('/new/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { message } = req.body;
    const { username } = req.params;

});

// @todo
router.delete('/:username/:messageId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { username, messageId } = req.params;
    const user = req.user;

});

module.exports = router;