const Market = require('../model/Market');

class MarketController {

    async store(req, res) {
        var data;
        try {
            data = await Market.create(req.body);
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }

    async find(req, res) {
        var data;
        try {
            data = await Market.find();
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }
}

module.exports = new MarketController();