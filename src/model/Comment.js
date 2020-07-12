const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    productID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, { collection: 'comment' });

module.exports = mongoose.model("comment", CommentSchema);