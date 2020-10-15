const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    from: {type: Schema.ObjectId, ref: 'User', required: true},
    to: {type: Schema.ObjectId, ref: 'User', required: true},
    text: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});



module.exports = mongoose.model('Message', MessageSchema);