const axios = require('axios');
const config = require('../../constants');

const getMovies = async () => {
  try {
    return await axios.get(constants.SWAPI + '/films/');
  } catch (error) {
    console.error(error);
  }
};

const getMovie = async id => {
  try {
    return await axios.get(constants.SWAPI + '/films/' + id + '/');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getMovies,
  getMovie
};
