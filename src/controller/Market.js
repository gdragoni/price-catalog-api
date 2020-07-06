const Market = require('../model/Market');
const Coordinate = require('../model/Coordinate');

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

    async update(req, res) {
        try {
            await Market.findByIdAndUpdate(req.body.id, req.body);
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json({ message: "Loja alterada" });
    }

    async find(req, res) {
        var data;
        try {
            let findQuery;
            const {
                lat, lng, range
            } = req.query;
            if(lat != null && lng != null && range != null) {
                const coord = new Coordinate(lat, lng);
                findQuery = coord.findRange(range);
            }
            data = await Market.find(findQuery);
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }

    async delete(req, res) {
        try {
            await Market.findByIdAndDelete(req.query.id);
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json({ message: "Loja removida" });
    }
}

module.exports = new MarketController();