export default function handler(req, res) {
    const distance = getDistanceFromLatLonInKm(req.body.latitude, req.body.longitude);
    res.status(200).json(distance);
}