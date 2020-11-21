const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const Message = require('../models/Message');

// @todo
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user = req.user;

    User.findById(user._id)
        .populate('messages')
        .exec((err, user) => {
            if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
            res.json(user.messages);
        });
});

// @todo
router.post('/new/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { message } = req.body;
    const thisUser = req.user;
    const { username } = req.params;

    const theMessage = new Message({
        from: thisUser,
        to: username,
        text: message
    })

    await theMessage.save()

    await User.findOneAndUpdate({ username }, { $addToSet: { messages: theMessage } });
    await User.findOneAndUpdate({ _id: thisUser._id }, { $addToSet: { messages: theMessage } });

    res.json({
        msgBody: "Message sent",
        msgErr: false
    });
});

// @todo
router.delete('/:username/:messageId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { username, messageId } = req.params;
    const user = req.user;

    const theMessage = await Message.findByIdAndDelete(messageId)
    await User.updateMany({ message: theMessage }, { $pull: { _id: theMessage._id } }, (err, _) => {
        if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
        res.json({
            msgBody: "Message deleted",
            msgErr: false
        });
    })
});

module.exports = router;