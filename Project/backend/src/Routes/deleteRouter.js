const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Product = require('../models/product');

const router = express.Router();

// Delete product.
router.delete('/deleteProduct/:id', (req, res, next) => {
    const toDelete = req.params.id;
    Product.deleteOne({ _id: toDelete })
    .then(result => {
        return (result.n === 0) ? res.status(404).send({ error: 'Product does not exist' })
            : res.status(200).send({ message: 'Product deleted' });
    })
    .catch(err => res.status(400).send({ error: err.message }));
});

// Delete user.
router.delete('/deleteUser/:id', (req, res, next) => {
    const toDelete = req.params.id;
    User.deleteOne({ _id: toDelete })
    .then(result => {
        return (result.n === 0) ? res.status(404).send({ error: 'User does not exist' })
            : res.status(200).send({ message: 'User deleted' });
    })
    .catch(err => res.status(400).send({ error: err.message }));
});

module.exports = router;