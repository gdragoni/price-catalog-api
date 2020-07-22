class Coodinate {

    constructor(latitude, longitude) {
        this.latitude = Number(latitude);
        this.longitude = Number(longitude);
    }

    distance(checkPoint) {
        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * this.latitude / 180.0) * ky;
        var dx = Math.abs(this.longitude - checkPoint.longitude) * kx;
        var dy = Math.abs(this.latitude - checkPoint.latitude) * ky;
        return Math.sqrt(dx * dx + dy * dy)
    }

    arePointsNear(checkPoint, km) {
        return this.distance(checkPoint) <= km;
    }

    findRange(km) {
        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * this.latitude / 180.0) * ky;
        return { 
            latitude: { $lte: this.latitude+(km/ky), $gte: this.latitude-(km/kx) },
            longitude: { $lte: this.longitude+(km/ky), $gte: this.longitude-(km/kx) },
        }
    }
}

module.exports = Coodinate;