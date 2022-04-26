const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
var sunCalc = require('suncalc');

chai.use(chaiHttp);

describe('findDistanceToMoon test', () => {

    it('test findDistanceToMoon endpoint for 49.03,10.02', (done) => {
        let distance = sunCalc.getMoonPosition(new Date(), 49.03, 10.02).distance;
        distance = distance + 1737.4;
        chai.request('http://localhost:3000')
        .post("/api/findDistanceToMoon")
        .send({latitude:"49.03",longitude:"10.2"})
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const acutalVal = res.body.distance;
            expect(parseInt(acutalVal,10)).to.be.equal(parseInt(distance,10));
            done();
        });
    });

    it('test findDistanceToMoon endpoint for 39,32', (done) => {
        let distance = sunCalc.getMoonPosition(new Date(), 39, 32).distance;
        distance = distance + 1737.4;
        chai.request('http://localhost:3000')
        .post("/api/findDistanceToMoon")
        .send({latitude:"39",longitude:"32"})
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const acutalVal = res.body.distance;
            expect(parseInt(acutalVal,10)).to.be.equal(parseInt(distance,10));
            done();
        });
    });

    it('test findDistanceToMoon for invalid parameters', (done) => {
        chai.request('http://localhost:3000')
        .get("/api/findDistanceToMoon")
        .end((err,res) => {
            res.error.should.have.status(405);
            done();
        });
    });
})