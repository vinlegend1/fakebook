const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const Post = require('./Post');

const FriendSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    messages: [{types: Schema.ObjectId, ref: 'Message'}]
});



module.exports = mongoose.model('Friend', FriendSchema);