/**
 * This is the router file that contains all routes from api v1.0.0
 * any new route should be added as in the format below...
 * If another API version where to be created, an index.js file such as
 * this must exist to keep all routes organized and in one place
 */
const express = require('express');
const router = express.Router();
const movies = require('./components/movies/movies.routes');
const characters = require('./components/characters/character.routes');
const comments = require('./components/comments/comments.routes');

router.use('/movies', movies);
router.use('/characters', characters);
router.use('/comments', comments);

module.exports = router;
