const express = require('express');
const controller = require('./movies.controller');
const router = express.Router();

router.get('/', function(req, res) {
  res.send({ hello: 'World', ip: req.ip });
});

module.exports = router;
