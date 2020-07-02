const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    type: {
        type: Number,
    },
}, { collection: 'market' });

module.exports = mongoose.model("market", MarketSchema);