const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../../config/config');

const router = express.Router();

// Register user.
router.post('/register', (req, res) => {
    let newUser = req.body.user;
    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err)
            return res.status(500).send({ message: 'Internal server Error' });
        else {
            newUser.password = hash;
            const user = new User(newUser);
            user.save()
            .then(() => res.status(201).send({ id: user._id }))
            .catch(err => {
                return (err.code === 11000) ? res.status(409).send({ message: 'The username already exists' }) 
                    : res.status(417).send({ error: err.message });
            });
        }
    });
});

// User login.
router.post('/login', (req, res) => {
    let loginUser = req.body.user;
    User.findOne({ userName: loginUser.userName })
    .then(user => {
        if (!user)
            return res.status(401).send({ message: 'Authentication failed'});
        else {
            bcrypt.compare(loginUser.password, user.password, (err, result) => {
                if (err || !result)
                    return res.status(401).send({ message: 'Authentication failed'});
                else {
                    const token = jwt.sign({
                            email: user.email,
                            userName: user.userName
                        }, 
                        config.JWT_KEY, { 
                            expiresIn: '1h' 
                        }
                    );
                    return res.status(200).send({ 
                        message: 'Authentication successful',
                        token: token
                    });
                }
            });
        }
    })
    .catch(err => res.status(500).send({ error: err.message }));
});

module.exports = router;