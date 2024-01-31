const apiRoute = require('express').Router();

const orderRoute = require('./orderRoute');
const inventoryRoute = require('./inventoryRoute');

apiRoute.use(orderRoute);
apiRoute.use(inventoryRoute);

module.exports = apiRoute;