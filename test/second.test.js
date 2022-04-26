const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

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

describe("distanceToNorthPole test", () => {
  it("test distanceToNorthPole endpoint for 49.03,10.2", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findDistanceToNorthPole")
      .send({ latitude: "49.03", longitude: "10.2" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        const acutalVal = res.body.distance;
        expect(acutalVal).to.be.equal(getDistanceFromLatLonInKm(49.03, 10.2));
        done();
      });
  });

  it("test distanceToNorthPole endpoint for 39,32", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findDistanceToNorthPole")
      .send({ latitude: "39", longitude: "32" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        const acutalVal = res.body.distance;
        expect(acutalVal).to.be.equal(getDistanceFromLatLonInKm(39, 32));
        done();
      });
  });

  it("test distanceToNorthPole for missing body", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findDistanceToNorthPole")
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        const acutalVal = res.body.error;
        expect(acutalVal).to.be.equal("Required request body is missing");
        done();
      });
  });

  it("test distanceToNorthPole for empty latitude and longitude values", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findDistanceToNorthPole")
      .send({ latitude: "", longitude: "" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        const acutalVal = res.body.error;
        expect(acutalVal).to.be.equal("Required request body is missing");
        done();
      });
  });
});
