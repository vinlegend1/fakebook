const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    postedBy: {type: String, required: true},
    likes: {
        type: Number,
        default: 0
    },
    comments: [{ body: String, date: Date }],
    shares: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


// UserSchema.methods.comparePassword = function(password, cb) {
//     bcrypt.compare(password, this.password, (err, isMatch) => {
//         if (err) {
//             return cb(err);
//         } else {
//             if (!isMatch) {
//                 return cb(null, isMatch);
//             }
//             return cb(null, this);
//         }

//     })
// }

module.exports = mongoose.model('Post', PostSchema);