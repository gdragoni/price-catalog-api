const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
}, { collection: 'market' });

module.exports = mongoose.model("market", MarketSchema);