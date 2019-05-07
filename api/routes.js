var express = require('express');
var router = express.Router();

/**
 * Route to api version folder; here any amount of versions can
 * be set up.
 */
router.use('/v1', require('./v1.0.0'));

module.exports = router;
