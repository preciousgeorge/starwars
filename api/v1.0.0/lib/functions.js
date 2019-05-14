let { toFeet } = require('./conversion');

/**
 * parse a url string and get the movie id from it
 * @param {string} url
 */
let getMovieIdFromUrl = url => {
  arr = url.split('/');
  return parseInt(arr[arr.length - 2]);
};

const getIdsFromMovieUrls = data => {
  len = data.length;
  ids = [];
  for (let i = 0; i < len; i++) {
    ids.push(getMovieIdFromUrl(data[i]));
  }
  return ids;
};

/**
 * Check if string count is valid
 * @param {string} str
 */
let isStrCountValid = str => {
  if (str.length <= 500) {
    return true;
  }
  return false;
};

/**
 *
 * @param {array} arr
 * @returns array
 */
let addTotalHeight = arr => {
  lenArr = arr.length;
  totalHeight = 0;
  for (let i = 0; i < lenArr; i++) {
    totalHeight += parseInt(arr[i]['height']);
  }

  arr.push({
    total_height_cm: totalHeight + 'cm',
    total_height_feet: toFeet(totalHeight)
  });

  return arr;
};

/**
 *
 * @param {array} arr
 * @returns array
 */
let totalCharacters = arr => {
  lenArr = arr.length;
  totalChar = 0;
  for (let i = 0; i < lenArr; i++) {
    totalChar += 1;
  }
  arr.push({
    total_characters: totalChar
  });

  return arr;
};

let errorMessage = {
  message:
    'Sorry Anakin Skywalker, there is no light to be found on the Dark side'
};

let filterByProp = (data, prop, _filter) => {
  return data.filter(dat => {
    return dat[prop] == _filter;
  });
};

module.exports = {
  getMovieIdFromUrl,
  isStrCountValid,
  getIdsFromMovieUrls,
  addTotalHeight,
  totalCharacters,
  errorMessage,
  filterByProp,
  validateIdInteger
};
