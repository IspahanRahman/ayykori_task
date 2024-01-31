const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    keyGenerator: (req) => req.headers['api-key'],
    handler: (req, res, next) => {
        res.status(429).json({
            message: 'Too Many Requests'
        });
    }
});

module.exports = apiLimiter;