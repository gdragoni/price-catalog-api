const Market = require('../model/Market');

class MarketController {

    async store(req, res) {
        const data = await Market.create(req.body);

        return res.json(data);
    }

    async find(req, res) {
        const data = await Market.find();

        return res.json(data);
    }
}

module.exports = new MarketController();