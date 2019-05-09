const express = require('express');
const router = express.Router();
const {
  listMovies,
  getCharactersOfMovie,
  fetchMovieComments,
  commentOnMovie
} = require('./movies.controller');

const { errorMessage } = require('../../lib/functions');

router.get('/', (req, res) => {
  listMovies()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(404).send({
        error: errorMessage.message,
        message: err.message
      });
    });
});

router.get('/:id/comments/', (req, res) => {
  fetchMovieComments(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(404).send({
        error: errorMessage.message,
        message: err.message
      });
    });
});

router.post('/:id/comments/', (req, res) => {
  commentOnMovie(req.params.id, req.body, req.ip)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(404).send({
        error: errorMessage.message,
        message: err.message
      });
    });
});

router.get('/:id/characters/', (req, res) => {
  getCharactersOfMovie(
    req.params.id,
    req.query.sortby,
    req.query.orderby,
    req.query.filterby
  )
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(404).send({
        error: errorMessage.message,
        message: err.message,
        code: err.code
      });
    });
});

router.get('/:id', (req, res) => {});

module.exports = router;
