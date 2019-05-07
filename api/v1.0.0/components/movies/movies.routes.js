const express = require('express');
const controller = require('./movies.controller');
const router = express.Router();
const { listMovies, getMovieById } = require('./movies.controller');

/*router.get('/', function(req, res) {
  res.send({ hello: 'World', ip: req.ip });
});*/

router.get('/', (req, res) => {
  listMovies()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send({
        message:
          'Sorry Anakin Skywalker, there is no light to be found on the Dark side',
        details: err
      });
    });
});

router.get('/:id', (req, res) => {});

module.exports = router;
