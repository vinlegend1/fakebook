const User = require('../models/User');
const passport = require("passport");
const router = require('express').Router();
const Message = require('../models/Message');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user = req.user;

    User.findById(user._id, (err, user) => {
        return res.status(200).json(user.messages);
    })
});

router.post('/new/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { message } = req.body;
    const { username } = req.params;
    const user = req.user;
    let userObjOfReceiver = null;

    await User.findOne({ username }, (err, user) => {
        if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
        if (!user) return res.status(400).json({ msgBody: "No username found", msgErr: true });
        userObjOfReceiver = user;
        
    });

    const messageObj = new Message({
        from: user,
        to: userObjOfReceiver,
        text: message
    });

    await messageObj.save((err, msg) => {
        if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
    })

    await User.findByIdAndUpdate(user._id, { $addToSet: { messages: messageObj } }, (err, user1) => {
        if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
        if (!user) return res.status(400).json({ msgBody: "No username found", msgErr: true });

        User.findOneAndUpdate({ username }, { $addToSet: { messages: messageObj } }, (err, user2) => {
            if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
            if (!user) return res.status(400).json({ msgBody: "No username found", msgErr: true });
            return res.status(200).json(messageObj);
        });
    })

    
});

// Have to fix this route... so don't use it at the moment
router.delete('/:username/:messageId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { username, messageId } = req.params;
    const user = req.user;

    await Message.findOneAndDelete({ _id: messageId }, async (err, msg) =>{
        if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
        if (!msg) return res.status(400).json({ msgBody: "No username found", msgErr: true });
        
        await User.findOneAndUpdate({ _id: user._id }, { $pull: { messages: msg } });
        await User.findOneAndUpdate({ username }, { $pull: { messages: msg } }, (err, user) => {
            if (err) return res.status(500).json({ msgBody: "Something went wrong", msgErr: true });
            if (!user) return res.status(400).json({ msgBody: "No username found", msgErr: true });

            return res.status(200).json({
                msgBody: "Message deleted",
                msgErr: false
            })
        })
    })
    
});

module.exports = router;