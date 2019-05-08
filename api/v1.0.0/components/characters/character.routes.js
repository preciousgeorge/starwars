const express = require('express');
const router = express.Router();
const { getCharacters } = require('./characters.controller');

router.get('/', (req, res) => {
  getCharacters(req.query.sortby, req.query.orderby, req.query.filterby)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log('_____WHERE THA ERROR AT????????');
      console.log(error);
      res.status(404).send({
        message:
          'Sorry Anakin Skywalker, there is no light to be found on the Dark side',
        details: error
      });
    });
});

module.exports = router;
