const axios = require('axios');
const constants = require('../../constants');

const getCharacters = async () => {
  try {
    return await axios.get(constants.SWAPI + '/people/');
  } catch (error) {
    console.error(error);
  }
};

const getCharacter = async id => {
  try {
    return await axios.get(constants.SWAPI + '/people/' + id + '/');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getCharacters,
  getCharacter
};
