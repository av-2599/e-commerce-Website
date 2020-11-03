const express = require('express');

const Product = require('../models/product');
const Cart = require('../models/cart');
const jwt = require('../config/jwt');

const router = express.Router();

// Get Products
router.get('/getProducts', (req, res, next) => {
    Product.find()
    .then(products => {
        return (!products) ? res.status(404).send({ error: 'No Products Found' })
            : res.status(200).send(products);
    })
    .catch(err => res.status(500).send({ 
        error: err.message 
    }));
});

// Get specific product
router.get('/getProduct/:id', (req, res, next) => {
    const productId = req.params.id;
    Product.findOne({ _id: productId })
    .then(product => res.status(200).send({ 
        product 
    }))
    .catch(err => res.status(404).send({ 
        error: err.message 
    }));
});

// Get user cart information
router.get('/getCart', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    Cart.find({ user: userId })
    .then(carts => {
        let shoppingCart = {
            user: userId,
            products: [],
        }
        for (let cart of carts) {
            shoppingCart.products.push({ 
                product: cart.product,
                quantity: cart.quantity
            });
        }
        res.status(200).send({ 
            shoppingCart 
        });
    })
    .catch(err => res.status(400).send({ 
        error: err.message 
    }));
});

module.exports = router;