var sunCalc = require('suncalc');

export default function handler(req, res) {

    if(req.method != 'POST') {
        res.status(405).json({
            error: 'Method not allowed'
        });
    }

    else{
        let distance = sunCalc.getMoonPosition(new Date(), req.body.latitude, req.body.longitude).distance;
        distance = distance + 1737.4;
        const result = {"distance": distance};
        res.status(200).json(result);
    }
}