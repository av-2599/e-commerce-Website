const express = require('express');

const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
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
                cartId: cart._id,
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

// Checkout with cart.
router.get('/checkout', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    Cart.find({ user: userId }, { _id: false })
    .then(carts => {
        console.log("Carts:", carts);
        Order.insertMany(carts)
        .then(result => {
            for (let cart of result) {
                const { product: productId, quantity: userQuantity } = cart;
                Product.findOne({ _id: productId })
                .then(product => {
                    Product.updateOne({ _id: productId }, {
                        $set: { 
                            quantity: product.quantity - userQuantity
                        }
                    })
                    .catch(err => {
                        res.status(400).send({
                            error: err.message
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send({
                        error: err.message
                    })
                })
                Cart.deleteMany({ user: userId })
                .then(() => {
                    res.status(200).send({
                        message: "Successful checkout"
                    });
                })
                .catch(err => res.status(400).send({
                    error: err.message
                }));
            }
        })
        .catch(err => res.status(400).send({
            error: err.message
        }))
    })
    .catch(err => res.status(400).send({ 
        error: err.message 
    }));
});


// Get orders
router.get('/getOrders', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    Order.find({ user: userId }, { user: false, _id: false, __v: false })
    .then(result => {
        res.status(200).send({
            message: result
        });
    })
    .catch(err => {
        res.status(400).send({
            error: err.message
        });
    });
});

module.exports = router;