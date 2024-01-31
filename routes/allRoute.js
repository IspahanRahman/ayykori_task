const apiRoute = require('express').Router();

const orderRoute = require('./orderRoute');

apiRoute.use(orderRoute);

module.exports = apiRoute;