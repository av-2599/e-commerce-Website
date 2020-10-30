const express = require('express');

const Product = require('../models/product');

const router = express.Router();

// Get Products
router.get('/getProducts', (req, res, next) => {
    Product.find()
    .then(products => {
        return (!products) ? res.status(404).send({ message: 'No Products Found' })
            : res.status(200).send(products);
    })
    .catch(err => res.status(500).send({ error: err.message }));
});

// Get specific product
router.get('/getProduct/:id', (req, res, next) => {
    const toFind = req.params.id;
    Product.findOne({ _id: toFind })
    .then(product => res.status(200).send({ product }))
    .catch(err => res.status(404).send({ error: err.message }));
});

module.exports = router;