const orderRoute = require('express').Router();
const { placeOrder, makePayment, shipItems } = require('../controllers/orderController');

orderRoute.post('/place-order',placeOrder);
orderRoute.post('/makePayment',makePayment);
orderRoute.post('/shipItems',shipItems);

module.exports = orderRoute;
