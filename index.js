require("dotenv").config();
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));