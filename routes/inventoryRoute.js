const inventoryRoute = require('express').Router();
const { getInventory,inventoryById,createInventory,updateInventory,deleteInventory } = require('../controllers/inverntoryController');

inventoryRoute.get('/all-inventory',getInventory);
inventoryRoute.post('/create-inventory',createInventory);
inventoryRoute.get('/inventoryById/:id',inventoryById);
inventoryRoute.put('/update-inventory/:id',updateInventory);
inventoryRoute.delete('/delete-inventory/:id',deleteInventory);

module.exports = inventoryRoute;
