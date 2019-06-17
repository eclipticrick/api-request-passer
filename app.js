'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const global = require('./globals');

app.use((req, res, next) => {
    if (global.allowConnectionFromAllOrigins) {
        res.header('Access-Control-Allow-Origin', '*');
    } else {
        const origin = req.headers.origin;
        if (global.allowedOrigins.indexOf(origin) > -1) {
            res.header('Access-Control-Allow-Origin', origin);
        }
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Allow all HTTP methods
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');

    return next();
});

/**
 * bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// routes are defined here
app.use('/', routes);

// for sending server errors back to the client as json
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send( { error: err.toString() } );
});

// listen for requests
app.listen(global.port, (err) => {
    if (err) return console.log(`server could not be started on port ${global.port}`, err);
    console.log(`server is listening on ${global.port}`)
});
