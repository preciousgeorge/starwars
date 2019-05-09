const {
  insertComment,
  fetchAllComments,
  fetchCommentByFilmId,
  fetchCommentByFilmIdReversed
} = require('./comments.service');

const { getMovieIdFromUrl } = require('../../lib/functions');

const { convertDateToUTC } = require('../../lib/conversion');

/**
 * check string length against a minimum condition
 * @param {string} comment
 * @returns bool
 */
const validateCommentMinLen = comment => {
  if (comment.length > 10) {
    return true;
  }
  return false;
};

/**
 * Check comment length against a max condition
 * @param {string} comment
 * @returns bool
 */
const validateCommentMaxLen = comment => {
  if (comment.length > 500) {
    return false;
  }
  return true;
};

/**
 * Check that  fildId exists and is an integer
 * @param {Integer} filmId
 * @returns bool
 */
const validateFilmId = filmId => {
  if (filmId && Number.isInteger(parseInt(filmId))) {
    return true;
  }
  return false;
};

/**
 * Validate data against et conditions and return a array of errors
 * if any fails aor an empty array if non fails
 * @param {object} data
 * @returns array
 */
const validateCommentData = data => {
  errors = [];
  if (validateFilmId(data['filmId']) == false) {
    errors.push('Film id cannot be empty, and must be a valid integer');
  } else if (validateCommentMinLen(data['comment']) == false) {
    errors.push('Comment must be at least 10 characters');
  } else if (validateCommentMaxLen(data['comment']) == false) {
    errors.push('Comment must not be more than 500 characters');
  }
  return errors;
};

/**
 * insert into database
 * @param {request} data
 * @returns Promise
 */
const createComment = (data, userIp) => {
  //return Promise.all(insertComment(data));

  const insertData = {};
  insertData['filmId'] = data.film_id;
  insertData['comment'] = data.comment;
  insertData['userIp'] = userIp;
  return new Promise((resolve, reject) => {
    errors = validateCommentData(insertData);
    if (errors.length > 0) {
      throw new Error(errors);
    } else {
      insertComment(insertData)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

/**
 * Get comments for a particular movie
 * @param {integer} filmId
 */
const getCommentsForMovie = filmId => {
  return new Promise((resolve, reject) => {
    if (validateFilmId(filmId) == false) {
      throw new Error('FildId cannot be empty');
    } else {
      fetchCommentByFilmIdReversed(filmId)
        .then(data => {
          data = data.map(el => el.get({ plain: true }));
          data.map(obj => {
            obj.createdAt = convertDateToUTC(obj.createdAt);
            return obj;
          });
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

module.exports = {
  createComment,
  getCommentsForMovie,
  validateCommentData
};
