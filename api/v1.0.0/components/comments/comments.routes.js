const express = require('express');
const router = express.Router();
const { createComment, getCommentsForMovie } = require('./comments.controller');

router.post('/', (req, res) => {
  createComment(req.body, req.ip)
    .then(data => {
      res.send({ message: 'Comment Inserted Successfully', data: data });
    })
    .catch(error => {
      res.status(404).send({
        message:
          'Sorry Anakin Skywalker, there is no light to be found on the Dark side',
        details: error
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
        message:
          'Sorry Anakin Skywalker, there is no light to be found on the Dark side',
        details: error
      });
    });
});

module.exports = router;
