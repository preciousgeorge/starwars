const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send({ hello: 'World' });
});

router.get('/sortby/height/:order', function(req, res) {
  res.send();
});

router.get('/sortby/gender/:order', function(req, res) {
  res.send();
});

router.get('/sortby/name/:order', function(req, res) {
  res.send();
});

router.get('/filterby/:gender', function(req, res) {
  res.send();
});

module.exports = router;
