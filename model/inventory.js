const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      required: true,
    },
    manufacturer: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
  });

  module.exports = mongoose.model("Inventory",inventorySchema);