const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: { 
        type: String, 
        required: true 
    },
    items: [{
        productId: { 
            type: String, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true
        },
        quantity: { 
            type: Number, 
            required: true, 
            min: 1 
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed'],
        default: 'pending',
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model("Order",orderSchema);