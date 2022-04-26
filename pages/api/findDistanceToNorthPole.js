export default function handler(req, res) {
  console.log(req.body);
  if (req.method != "POST") {
    res.status(405).json({
      error: "Method not allowed",
    });
  } else {
    if (req.body.latitude && req.body.longitude) {
      if (
        !(req.body.longitude >= -180 && req.body.longitude <= 180) ||
        !(req.body.latitude >= -90 && req.body.latitude <= 90)
      )
        res.status(400).json({
          error:
            "Error: The numbers should be in decimal degrees format and range from -90 to 90 for latitude and -180 to 180 for longitude.",
        });
      else {
        const distance = getDistanceFromLatLonInKm(
          req.body.latitude,
          req.body.longitude
        );
        const result = { distance: distance };
        res.status(200).json(result);
      }
    } else {
      res.status(400).json({
        error: "Required request body is missing",
      });
    }
  }
}

function getDistanceFromLatLonInKm(lat1, lon1) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(90 - lat1); // deg2rad below
  var dLon = deg2rad(0 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(90)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
