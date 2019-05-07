const axios = require('axios');
const constants = require('../../constants');

const getCharacters = async () => {
  try {
    return await axios.get(constants.SWAPI + '/people/');
  } catch (error) {
    return await error;
  }
};

const getCharacter = async id => {
  try {
    return await axios.get(constants.SWAPI + '/people/' + id + '/');
  } catch (error) {
    return await error;
  }
};

module.exports = {
  getCharacters,
  getCharacter
};
