const express = require('express');
const router = express.Router();
const { createComment, getCommentsForMovie } = require('./comments.controller');
const { errorMessage } = require('../../lib/functions');

router.post('/', (req, res) => {
  createComment(req.body, req.ip)
    .then(data => {
      res.send({ message: 'Comment Inserted Successfully', data: data });
    })
    .catch(error => {
      res.status(404).send({
        error: errorMessage.message,
        message: error.message
      });
    });
});

router.get('/:filmId', (req, res) => {
  getCommentsForMovie(req.params.filmId)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(404).send({
        error: errorMessage.message,
        message: error.message
      });
    });
});

module.exports = router;
