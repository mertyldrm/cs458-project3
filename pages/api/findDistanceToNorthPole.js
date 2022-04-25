export default function handler(req, res) {
        const distance = getDistanceFromLatLonInKm(req.body.latitude, req.body.longitude);
        res.status(200).json(distance);
}

function getDistanceFromLatLonInKm(lat1,lon1) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(90-lat1);  // deg2rad below
    var dLon = deg2rad(0-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(90)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

