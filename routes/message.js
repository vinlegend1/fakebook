const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const Message = require('../models/Message');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user = req.user;

});

router.post('/new/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { message } = req.body;
    const { username } = req.params;

});

// Have to fix this route... so don't use it at the moment
router.delete('/:username/:messageId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { username, messageId } = req.params;
    const user = req.user;

});

module.exports = router;