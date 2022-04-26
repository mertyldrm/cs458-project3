import axios from "axios";

export default function handler(req, res) {
    if(req.method != 'POST') {
        res.status(405).json({
            error: 'Method not allowed'
        });
    }
    
    else{
    if (!(req.body.longitude >= -180 && req.body.longitude <= 180) || !(req.body.latitude >= -90 && req.body.latitude <= 90))
        res.status(400).json('Error: The numbers should be in decimal degrees format and range from -90 to 90 for latitude and -180 to 180 for longitude.');
    else {
        axios.post(`http://api.geonames.org/countryCodeJSON?lat=${req.body.latitude}&lng=${req.body.longitude}&username=aisik`).then((response) => {
            if (response.data == 'ERR:15:no country code found\n')
                res.status(404).json(response.data);
            else
                res.status(200).json(response.data);
        });
    };
  }
}