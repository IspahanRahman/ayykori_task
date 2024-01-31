const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI,{
        userNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log('Sucessfully connected to database');
    })
    .catch((error)=>{
        console.log("Database connection failed. exiting now...");
        console.log(error);
        process.exit(1);
    })
};