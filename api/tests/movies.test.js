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

describe('Movies Services', () => {
  describe('/GET movies from SWAPI', () => {
    it('it should GET all starwars movies from swapi', done => {
      getMovies()
        .then(result => {
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
          expect(result.data).to.be.an('object');
          expect(result.data).to.include.all.keys('title', 'opening_crawl');
        })
        .catch(err => {
          console.log(err);
        });
      done();
    });
  });
});

describe('Movies Controller', () => {
  describe('/GET All movies from api', () => {
    it('it should GET movies list', done => {
      chai
        .request(server)
        .get('/api/v1/movies')
        .end((err, res) => {
          console.log(res);
          res.should.have.status(200);
          res.body.should.include.keys('release_date');
          res.body.should.include.keys('opening_crawl');
          done();
        });
    });
  });

  /*describe('/GET one movie from api', () => {
    it('it should GET the movie for which an id was given', done => {
      chai
        .request(server)
        .get('/api/v1/movies/3')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys('release_date');
          res.body.should.include.keys('opening_crawl');
          done();
        });
    });
  });*/
});
