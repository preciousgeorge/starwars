process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();
let expect = require('chai').expect;
let {
  getMovies,
  getMovie
} = require('../v1.0.0/components/movies/movies.service');

//Our parent block
describe('Movies', () => {
  /*
   * Test the /GET route
   */
  describe('/GET movies', () => {
    it('it should GET all the movies', done => {
      chai
        .request(server)
        .get('/api/v1/movies')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).should.to.be.an('object');

          done();
        });
    });
  });
});

describe('Movies Services', () => {
  describe('/GET movies from SWAPI', () => {
    it('it should GET all starwars movies from swapi', done => {
      getMovies()
        .then(result => {
          console.log(result.data);
          expect(result.data).to.be.an('object');
          expect(result.data).to.include.all.keys('count', 'results');
        })
        .catch(err => {
          console.log(err);
        });
      done();
    });
  });

  describe('/GET movie from SWAPI with id', () => {
    it('it should GET a movie from swapi api with supplied id', done => {
      getMovie(1)
        .then(result => {
          console.log(result);
          expect(result.data).to.be.an(object);
          expect(result.data).to.include.all.keys(
            'title',
            'opening_crawl',
            'characters'
          );
        })
        .catch(err => {
          console.log(err);
        });
      done();
    });
  });
});
