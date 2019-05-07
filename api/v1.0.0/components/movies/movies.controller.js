const util = require('util');
const movieService = require('./movies.service');
const { sortBy } = require('../../lib/sort');
const {
  countAllCommentsOnFilm,
  countAllComments
} = require('../comments/comments.service');
const { getMovieIdFromUrl } = require('../../lib/functions');

/**
 * Takes and array of movies object and reduces it to
 * just the needed data whilst adding the comments count
 * per movie
 * @param {array} data
 * @returns Promise
 */
let reduceMovie = data => {
  return data.map(async obj => {
    const newObj = {};
    let comments_count = '';
    newObj['title'] = obj.title;
    newObj['opening_crawl'] = obj.opening_crawl;
    newObj['release_date'] = obj.release_date;
    try {
      comments_count = await countAllCommentsOnFilm(getMovieIdFromUrl(obj.url));
    } catch (err) {
      return err;
    }
    newObj['comments_count'] = comments_count;
    return newObj;
  });
};

/**
 * Fetch movies by calling the getMovies service and returns
 * a promise
 * @return Promise
 */
let listMovies = async () => {
  try {
    const moviesList = await movieService.getMovies();
    let sortedMovies = sortBy(moviesList.data.results, {
      prop: 'release_date',
      desc: false
    });

    return Promise.all(reduceMovie(sortedMovies));
  } catch (error) {
    return error;
  }
};

let getMovieById = async () => {};

module.exports = {
  listMovies,
  getMovieById
};
