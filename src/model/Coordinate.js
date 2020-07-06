class Coodinate {

    constructor(latitude, longitude) {
        this.latitude = Number(latitude);
        this.longitude = Number(longitude);
    }

    arePointsNear(checkPoint, km) {
        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * this.latitude / 180.0) * ky;
        var dx = Math.abs(this.longitude - checkPoint.longitude) * kx;
        var dy = Math.abs(this.latitude - checkPoint.latitude) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;
    }

    findRange(km) {
        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * this.latitude / 180.0) * ky;
        return { 
            lat: { $lte: this.latitude+(km/ky), $gte: this.latitude-(km/kx) },
            lng: { $lte: this.longitude+(km/ky), $gte: this.longitude-(km/kx) },
        }
    }
}

module.exports = Coodinate;