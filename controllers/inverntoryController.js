const Inventory = require('../model/inventory');
const mongoose = require('mongoose');

const getInventory = async(req,res)=>{
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        const inventory = await Inventory.find({}).exec();
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            message:"inventory fetched successfully",
            data:inventory
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const inventoryById = async(req,res) => {
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        const inventory = await Inventory.findById(req.params.id).exec();
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json(inventory);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const createInventory = async (req, res) => {
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        const inventory = new Inventory({
            productId: req.body.productId,
            quantity: req.body.quantity,
            price: req.body.price,
            manufacturer: req.body.manufacturer,
            expiryDate: req.body.expiryDate,
        });
        await inventory.save({session});
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            message:"inventory created successfully",
            data:inventory
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const updateInventory = async(req,res)=>{
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec();
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            message:"inventory updated successfully",
            data:inventory
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const deleteInventory = async(req,res)=>{
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        const inventory = await Inventory.findByIdAndDelete(req.params.id).exec();
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            message:"inventory deleted successfully",
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
    getInventory,
    inventoryById,
    createInventory,
    updateInventory,
    deleteInventory
}