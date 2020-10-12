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