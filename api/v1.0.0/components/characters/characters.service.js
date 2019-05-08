const axios = require('axios');
const constants = require('../../constants');

const fetchCharacters = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(constants.SWAPI + '/people/')
      .then(data => {
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const fetchCharacter = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(constants.SWAPI + '/people/' + id + '/')
      .then(data => {
        resolve(data.result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  fetchCharacters,
  fetchCharacter
};
