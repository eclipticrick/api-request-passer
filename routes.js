const fetch = require('node-fetch');
const express = require('express');
const router = express.Router({});

const BASE_URL = '';
const ROUTES = {
    get: [],
    put: [],
    post: [],
    delete: [],
};
const HEADERS = {};


// For eacht httpMethod (GET, PUT, POST, DELETE)
Object.keys(ROUTES).forEach(method => {

    // For each URL specified under that method
    ROUTES[method].forEach(route => {

        // Create an endpoint for each url with the specified method (e.g. GET)
        router[method](route, (req, res, next) => {

            const options = {
                method: method,
                headers: HEADERS
            };

            /**
             * If the body object is not empty (and if it's not a GET request), add the body to the options
             */
            if (Object.keys(req.body).length && method !== 'get') {
                options.body = req.body;
            }

            /**
             * Builds the queryParamsString if the URL was called with query params
             */
            const queryParamKeys = Object.keys(req.query);
            let queryParamsString = '';
            if (queryParamKeys.length) {
                queryParamsString += '?';
                queryParamKeys.forEach((key, i) => {
                    queryParamsString += `${key}=${req.query[key]}`;
                    if (i !== queryParamKeys.length - 1) {
                        queryParamsString += '&'
                    }
                })
            }

            // Fetch data from an external API with all given options (body/headers) and the query params
            fetch(BASE_URL + route + queryParamsString, options).then(r => r.json()).then(data => res.send(data))
        })
    })
});

module.exports = router;
