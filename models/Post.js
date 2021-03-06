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
    postedBy: { type: String, required: true },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    shares: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', PostSchema);