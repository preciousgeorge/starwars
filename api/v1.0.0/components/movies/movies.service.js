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
  try {
    return await axios.get(constants.SWAPI + '/films/' + id + '/');
  } catch (error) {
    return await error;
  }
};

module.exports = {
  getMovies,
  getMovie
};
