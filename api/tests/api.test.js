process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();
let expect = require('chai').expect;

chai.use(chaiHttp);
//Check non existent url
describe('/GeT api', () => {
  it('it should return Status 404', done => {
    chai
      .request(server)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
