const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const cacheit = require('./api/v1.0.0/lib/cacheit');
const dbconncheck = require('./api/v1.0.0/lib/dbconncheck')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(dbconncheck);

app.use('/api', routes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.message =
        'You are not supposed to be here `Luke SkyWalker`; this place is filled with the dark force';
    error.status = 404;
    next(error);
});



app.use(cacheit);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({ error: error.message });
});

if (!module.parent) {
    const server = app.listen(process.env.PORT || 3000, () => {
        const host = server.address().address;
        const port = server.address().port;
        console.log(
            'Starwars, the galaxy is listening at http://%s:%s',
            host,
            port
        );
    });
}

module.exports = app;