const Order = require('../model/order');
const mongoose = require('mongoose');

const placeOrder = async(req,res)=>{
    const { user_id, items, status } = req.body;
    try{
        const session = await mongoose.startSession();
        session.startTransaction();

        const order = new Order({
            user_id,
            items,
            status,
            created_at: Date.now(),
            updated_at: Date.now()
        });

        await order.save({session});
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({
            message: "Order placed successfully"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports ={
    placeOrder
}