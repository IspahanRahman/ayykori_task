const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },
    items: [{
        item_id: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
})

module.exports = mongoose.model("Order",orderSchema);