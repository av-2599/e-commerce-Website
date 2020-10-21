const express = require('express');

const Product = require('../models/product');

const router = express.Router();

// Get Products
router.get('/get-products', (req, res, next) => {
    Product.find()
    .then(products => {
        return (!products) ? res.status(404).send({ message: 'No Products Found' })
            : res.status(200).send(products);
    })
    .catch(err => {
        return res.status(500).send({
            error: err.message
        })
    });
});

module.exports = router;