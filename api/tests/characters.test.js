process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();
let expect = require('chai').expect;
let {
  getCharacters,
  getCharacter
} = require('../v1.0.0/components/characters/characters.service');

describe('Character Services', () => {
  describe('/GET characters from SWAPI', () => {
    it('it should GET all starwars characters from swapi', done => {
      getCharacters()
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

  describe('/GET character from SWAPI with id', () => {
    it('it should GET a character from swapi api with supplied id', done => {
      getCharacter(1)
        .then(result => {
          console.log(result);
          expect(result.data).to.be.an(object);
          expect(result.data).to.include.all.keys('name', 'height', 'gender');
        })
        .catch(err => {
          console.log(err);
        });
      done();
    });
  });
});
