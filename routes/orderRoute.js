const orderRoute = require('express').Router();
const { placeOrder } = require('../controllers/orderController');

orderRoute.post('/place-order',placeOrder);

module.exports = orderRoute;
