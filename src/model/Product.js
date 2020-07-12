const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    marketID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true
    },
    imageName: {
        type: String,
        required: false,
    }
}, { collection: 'product' });

module.exports = mongoose.model("product", ProductSchema);