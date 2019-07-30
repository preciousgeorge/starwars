const express = require('express');
const router = express.Router();
const {
    listMovies,
    getCharactersOfMovie,
    fetchMovieComments,
    commentOnMovie,
    fetchMovie
} = require('./movies.controller');

const { errorMessage, getUserIp } = require('../../lib/functions');

router.get('/', (req, res) => {
    listMovies()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(404).send({
                error: errorMessage.message,
                message: err.message
            });
        });
});

router.get('/:id/comments/', (req, res) => {
    fetchMovieComments(req.params.id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(404).send({
                error: errorMessage.message,
                message: err.message
            });
        });
});

router.post('/:id/comments/', (req, res) => {
    ipAddr = getUserIp || req.ip;
    commentOnMovie(req.params.id, req.body, ipAddr)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(404).send({
                error: errorMessage.message,
                message: err.message
            });
        });
});

router.get('/:id/characters/', (req, res) => {
    getCharactersOfMovie(
            req.params.id,
            req.query.sortby,
            req.query.orderby,
            req.query.filterby
        )
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(404).send({
                error: errorMessage.message,
                message: err.message
            });
        });
});

router.get('/:id', (req, res) => {
    fetchMovie(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.name);
            res.status(404).send({
                error: errorMessage.message,
                message: err.message
            });
        });
});

module.exports = router;