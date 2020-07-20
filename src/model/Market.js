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
    type: {
        type: Number,
        required: true,
    },
}, { collection: 'market' });

module.exports = mongoose.model("market", MarketSchema);