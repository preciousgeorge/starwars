/**
 * parse a url string and get the movie id from it
 * @param {string} url
 */
let getMovieIdFromUrl = url => {
  arr = url.split('/');
  return parseInt(arr[arr.length - 2]);
};

module.exports = {
  getMovieIdFromUrl
};
