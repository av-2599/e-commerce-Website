const express = require('express')
const User = require('../models/user');
const Cart = require('../models/cart');

const router = express.Router();

router.post('/register', (req, res) => {
    const newUser = req.body.user;
    const user = new User(newUser);
    user.save()
    .then(() => res.status(201).send({ id: user._id }))
    .catch(err => {
        return (err.code === 11000) ? res.status(409).send({ error: 'The username already exists.' }) 
            : res.status(417).send({ error: err.message });
    });
});

module.exports = router;