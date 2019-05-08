const express = require('express');
const router = express.Router();
const { getCharacters } = require('./characters.controller');

router.get('/?sortby=val&orderby=orderval&filterby=gender', function(req, res) {
  getCharacters(req.param.sortby, req.params.orderby, req.params.filterby)
    .then(data => {
      res.send(data);
    })
    .catch(err =>
      res.status(404).send({
        message:
          'Sorry Anakin Skywalker, there is no light to be found on the Dark side',
        details: err
      })
    );
  res.send();
});

module.exports = router;
