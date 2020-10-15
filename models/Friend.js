const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const Post = require('./Post');

const FriendSchema = new Schema({
    username: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [{type: Schema.ObjectId, ref: 'Message'}]
});



module.exports = mongoose.model('Friend', FriendSchema);