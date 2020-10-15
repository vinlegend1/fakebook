const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const Post = require('./Post');

const MessageSchema = new Schema({
    from: {type: Schema.ObjectId, ref: 'User'},
    to: {type: Schema.ObjectId, ref: 'User'},
    text: [String],
    date: {
        type: Date,
        default: Date.now()
    }
});



module.exports = mongoose.model('Message', MessageSchema);