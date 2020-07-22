const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: false,
    }
    type: {
        type: Number,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
}, { collection: 'market' });

module.exports = mongoose.model("market", MarketSchema);