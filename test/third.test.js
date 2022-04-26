const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
var sunCalc = require("suncalc");

chai.use(chaiHttp);

describe("findDistanceToMoon test", () => {
  it("test findDistanceToMoon endpoint for 49.03,10.02", (done) => {
    let distance = sunCalc.getMoonPosition(new Date(), 49.03, 10.02).distance;
    distance = distance + 1737.4;
    chai
      .request("http://localhost:3000")
      .post("/api/findDistanceToMoon")
      .send({ latitude: "49.03", longitude: "10.2" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        const acutalVal = res.body.distance;
        expect(parseInt(acutalVal, 10)).to.be.equal(parseInt(distance, 10));
        done();
      });
  });

  it("test findDistanceToMoon endpoint for 39,32", (done) => {
    let distance = sunCalc.getMoonPosition(new Date(), 39, 32).distance;
    distance = distance + 1737.4;
    chai
      .request("http://localhost:3000")
      .post("/api/findDistanceToMoon")
      .send({ latitude: "39", longitude: "32" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        const acutalVal = res.body.distance;
        expect(parseInt(acutalVal, 10)).to.be.equal(parseInt(distance, 10));
        done();
      });
  });

  it("test findDistanceToMoon for invalid parameters", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/api/findDistanceToMoon")
      .end((err, res) => {
        res.error.should.have.status(405);
        done();
      });
  });

  it("test findDistanceToMoon for invalid parameters", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findDistanceToMoon")
      .send({ latitude: "190", longitude: "91" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        const acutalVal = res.body.error;
        expect(acutalVal).to.be.equal(
          "Error: The numbers should be in decimal degrees format and range from -90 to 90 for latitude and -180 to 180 for longitude."
        );
        done();
      });
  });

  it("test findDistanceToMoon for missing body", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findDistanceToMoon")
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        const acutalVal = res.body.error;
        expect(acutalVal).to.be.equal(
          "Your request body should include latitude and longitude values in object!"
        );
        done();
      });
  });

  it("test findDistanceToMoon for empty latitude and longitude values", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findDistanceToMoon")
      .send({ latitude: "", longitude: "" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        const acutalVal = res.body.error;
        expect(acutalVal).to.be.equal(
          "Your request body should include latitude and longitude values in object!"
        );
        done();
      });
  });
});
