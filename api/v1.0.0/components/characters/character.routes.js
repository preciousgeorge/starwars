const express = require('express');
const router = express.Router();
const { getCharacters } = require('./characters.controller');
const { errorMessage } = require('../../lib/functions');

router.get('/', (req, res) => {
  getCharacters(req.query.sortby, req.query.orderby, req.query.filterby)
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
