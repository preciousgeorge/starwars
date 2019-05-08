/**
 * parse a url string and get the movie id from it
 * @param {string} url
 */
let getMovieIdFromUrl = url => {
  arr = url.split('/');
  return parseInt(arr[arr.length - 2]);
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

module.exports = {
  getMovieIdFromUrl,
  isStrCountValid
};
