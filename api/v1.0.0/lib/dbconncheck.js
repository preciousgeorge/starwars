const flatCache = require('flat-cache');

const db = require('../../../models');



/**
 * Middleware for checking database connection
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
let dbconncheck = (req, res, next) => {
    db.sequelize
        .authenticate()
        .then(function(result) {
            next();
        })
        .catch(function(err) {
            error = {
                'error': 'Unable to connect to database, please contact admin',
                'err_number': err.original.errno,
                'err_code': err.original.code,

            }
            res.send(error)
        });
};

module.exports = dbconncheck;