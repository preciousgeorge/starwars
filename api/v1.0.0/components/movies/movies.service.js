const axios = require('axios');
const config = require('../../constants');

const getMovies = async () => {
  try {
    return await axios.get(constants.SWAPI + '/films/');
  } catch (error) {
    return await error;
  }
};

const getMovie = async id => {
  return new Promise((resolve, reject) => {
    axios
      .get(constants.SWAPI + '/films/' + id + '/')
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  getMovies,
  getMovie
};
