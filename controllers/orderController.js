const Order = require('../model/order');
const Inventory = require('../model/inventory');
const mongoose = require('mongoose');
const axios = require('axios');

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
        const paymentResponse = await axios.post('https://ayykori-task.onrender.com/api/makePayment', {
            user_id,
            amount: calculateTotal(items),
          });
    
          if (paymentResponse.data.success) {
            const shippingResponse = await axios.post('https://ayykori-task.onrender.com/api/shipItems', { order });
    
            if (shippingResponse.data.success) {
              order.status = 'completed';
              await order.save({ session });
              for (const item of items) {
                const { productId, quantity } = item;
                const inventoryItem = await Inventory.findOneAndUpdate(
                  { productId },
                  { $inc: { quantity: -quantity }, $set: { lastUpdated: new Date() } },
                  { new: true, session }
                );
                if (!inventoryItem || inventoryItem.quantity < 0) {
                  return res.json({message:'Insufficient inventory for one or more items'});
                }
              }
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json({
                message: "Order placed successfully"
            });
            } else {
              throw new Error('Shipping failed');
            }
          } else {
            throw new Error('Payment failed');
          }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

function calculateTotal(items) {
    // Calculate the total amount based on the items
    return items.reduce((total, item) => total + item.quantity, 0);
  }
  
const makePayment = async(req, res, next) => {
    try{
        const { user_id, amount } = req.body;
        console.log(`Payment made for user ${user_id} - Amount: ${amount}`);
        return res.status(200).json({ success: true });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const shipItems = async(req, res, next) => {
    try{
        const { order } = req.body;
        console.log(`Items shipped for order ${order._id}`);
        return res.status(200).json({ success: true });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
module.exports ={
    placeOrder,
    makePayment,
    shipItems
}