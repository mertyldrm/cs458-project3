const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('getCountry test', () => {

    it('test getCountry endpoint for Germany', (done) => {
        chai.request('http://localhost:3000')
        .post("/api/getCountry")
        .send({lat:"49.03",lng:"10.2"})
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const acutalVal = res.body.countryName;
            expect(acutalVal).to.be.equal("Germany");
            done();
        });
    });

    it('test getCountry endpoint for Turkey', (done) => {
        chai.request('http://localhost:3000')
        .post("/api/getCountry")
        .send({lat:"39",lng:"32"})
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const acutalVal = res.body.countryName;
            expect(acutalVal).to.be.equal("Turkey");
            done();
        });
    });
})