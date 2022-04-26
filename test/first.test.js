const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("getCountry test", () => {
  it("test getCountry endpoint for Germany", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findCurrentCountry")
      .send({ latitude: "49.03", longitude: "10.2" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        const acutalVal = res.body.countryName;
        expect(acutalVal).to.be.equal("Germany");
        done();
      });
  });

  it("test getCountry endpoint for Turkey", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findCurrentCountry")
      .send({ latitude: "39", longitude: "32" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        const acutalVal = res.body.countryName;
        expect(acutalVal).to.be.equal("Turkey");
        done();
      });
  });

  it("test getCountry for invalid parameters", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findCurrentCountry")
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

  it("test getCountry for missing body", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findCurrentCountry")
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

  it("test getCountry for empty latitude and longitude values", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/findCurrentCountry")
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
