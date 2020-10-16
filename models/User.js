const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
// const Post = require('./Post');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    friendRequest: [{ type: Schema.ObjectId, ref: 'User' }],
    friends: [{type: Schema.ObjectId, ref: 'User'}],
    messages: [{type: Schema.ObjectId, ref: 'Message'}]
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});


UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        } else {
            if (!isMatch) {
                return cb(null, isMatch);
            }
            return cb(null, this);
        }

    })
}

module.exports = mongoose.model('User', UserSchema);