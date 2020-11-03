const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const createToken = (payload) => {
    return jwt.sign(payload, config.JWT_KEY, { 
        expiresIn: '1h' 
    });
}

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) 
        return res.status(401).send({
            error: 'Invalid token'
        });
    jwt.verify(token, config.JWT_KEY, (err, user) => {
        if (err) 
            return res.status(403).send({
                error: err.message
            });
        req.session = user;
        next();
    });
}

exports.createToken = createToken;
exports.validateToken = validateToken;