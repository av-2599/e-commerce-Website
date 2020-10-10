const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// Register user.
router.post('/register', (req, res) => {
    let newUser = req.body.user;
    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err)
            return res.status(500).send({ error: 'Internal server Error' });
        else {
            newUser.password = hash;
            const user = new User(newUser);
            user.save()
            .then(() => res.status(201).send({ id: user._id }))
            .catch(err => {
                return (err.code === 11000) ? res.status(409).send({ error: 'The username already exists' }) 
                    : res.status(417).send({ error: err.message });
            });
        }
    });
});

module.exports = router;