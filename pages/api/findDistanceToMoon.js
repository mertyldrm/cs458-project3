var sunCalc = require("suncalc");

export default function handler(req, res) {
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
        let distance = sunCalc.getMoonPosition(
          new Date(),
          req.body.latitude,
          req.body.longitude
        ).distance;
        distance = distance + 1737.4;
        const result = { distance: distance };
        res.status(200).json(result);
      }
    } else {
      res.status(400).json({
        error:
          "Your request body should include latitude and longitude values in object!",
      });
    }
  }
}
