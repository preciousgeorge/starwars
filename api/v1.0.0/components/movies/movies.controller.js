const util = require('util');
const movieService = require('./movies.service');
const { sortBy } = require('../../lib/sort');
const { convertDateToUTC } = require('../../lib/conversion');
const {
    countAllCommentsOnFilm,
    insertComment,
    fetchCommentByFilmIdReversed
} = require('../comments/comments.service');
const { validateCommentData } = require('../comments/comments.controller');
const {
    getMovieIdFromUrl,
    getIdsFromMovieUrls,
    addTotalHeight,
    totalCharacters,
    filterByProp,
    validateIdInteger
} = require('../../lib/functions');
const charController = require('../characters/characters.service');

const ASC = 0;
const DESC = 1;
const orderSet = { asc: ASC, desc: DESC };

/**
 * Takes and array of movies object and reduces it to
 * just the needed data whilst adding the comments count
 * per movie
 * @param {array} data
 * @returns Promise
 */
const reduceMovie = data => {
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
const listMovies = async() => {
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

/**
 * Get a single movie using and integer id
 * @param {integer} id
 * @returns Promise
 */
const fetchMovie = id => {
    return new Promise((resolve, reject) => {
        if (!validateIdIntegerid(id)) {
            throw new Error('Id must be from the Galaxy Integer');
        }
        movieService
            .getMovie(id)
            .then(results => {
                resolve(results.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
/**
 * Gets characters in a movie using the movie's id
 * @param {integer} filmId
 * @param {string} sortval
 * @param {string} order
 * @param {string} filter
 * @returns Promise
 */
const getCharactersOfMovie = (filmId, sortval, order, filter) => {
    return new Promise((resolve, reject) => {
        if (!Number.isInteger(parseInt(filmId))) {
            throw new Error('Id must be from the Galaxy Integer');
        }
        charController
            .fetchCharacters()
            .then(data => {
                //Filter movie characters using film id
                results = data.results.filter(obj => {
                    return getIdsFromMovieUrls(obj['films']).includes(parseInt(filmId));
                });

                if (sortval) {
                    results = sortBy(results, {
                        prop: sortval,
                        desc: orderSet[order]
                    });
                }

                if (filter) {
                    // Filter movie characters using gender
                    results = filterByProp(results, 'gender', filter);
                }

                if (!results) {
                    reject("Sorry, the being you seek, has not been born yet, so he/she does not exist");
                }

                // Add total Height and total amount of Character marching the criteria
                results = totalCharacters(addTotalHeight(results));

                resolve(results);
            })
            .catch(err => {
                reject(err);
            });
    });
};

/**
 * Adds comment to the db using a particular movie Id
 * @param {integer} filmId
 * @param {array} data
 * @param {string} userIp
 * @returns Promise
 */
const commentOnMovie = (filmId, data, userIp) => {
    insertData = {};
    insertData['filmId'] = filmId;
    insertData['comment'] = data['comment'];
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
 * Get comment for a movie
 * @param {integer} id
 * @returns Promise
 */
const fetchMovieComments = id => {
    return new Promise((resolve, reject) => {
        if (!validateIdInteger(id)) {
            reject("Please provide a valid integer");
        }
        fetchCommentByFilmIdReversed(id)
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
    });
};

module.exports = {
    listMovies,
    getCharactersOfMovie,
    commentOnMovie,
    fetchMovieComments,
    fetchMovie
};