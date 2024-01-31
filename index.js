require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const {rateLimit} = require('express-rate-limit');
const handleTransaction = require('./middlewares/handleTransaction');
const apiRoute = require('./routes/orderRoute');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const requestCounts = new Map();

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    keyGenerator: (req) => req.headers['api-key'],
    handler: (req, res, next) => {
        const apiKey = req.headers['api-key'];
        const currentCount = requestCounts.get(apiKey) || 0;
        requestCounts.set(apiKey, currentCount + 1);
    
        console.log(`Rate limit exceeded for ${apiKey}. Count: ${currentCount + 1}`);
    
        res.status(429).json({ error: 'Too Many Requests' });
      },
});

// app.use(handleTransaction);
app.use(apiLimiter);

app.use('/api', apiRoute);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));