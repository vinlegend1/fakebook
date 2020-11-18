const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    text: { type: String, required: true },
    postedBy: { type: String },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', CommentSchema);