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
                latitude, longitude, range
            } = req.query;
            if(latitude != null && longitude != null && range != null) {
                const coord = new Coordinate(latitude, longitude);
                findQuery = coord.findRange(range);
            }
            data = await Market.find(findQuery);
            data.forEach(function(m){
                if(latitude != null && longitude != null && range != null) {
                    const userCoord = new Coordinate(latitude, longitude);
                    const mCoord = new Coordinate(m.latitude, m.longitude);
                    m.distance = userCoord.distance(mCoord);
                }
            });
            data = data.sort(function(a, b) {
                if(latitude != null && longitude != null && range != null) {
                    const userCoord = new Coordinate(latitude, longitude);
                    const aCoord = new Coordinate(a.latitude, a.longitude);
                    const bCoord = new Coordinate(b.latitude, b.longitude);
                    return userCoord.distance(aCoord) - userCoord.distance(bCoord);
                }
                return true
            });
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