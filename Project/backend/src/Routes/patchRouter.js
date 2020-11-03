const express = require('express');

const Product = require('../models/product');
const Cart = require('../models/cart');
const jwt = require('../config/jwt');

const router = express.Router();

router.patch('/updateProduct/:id', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    const updatedProduct = req.body.product;
    const productId = req.params.id;
    Product.findOne({ _id: productId })
    .then(productToUpdate => {
        if (productToUpdate.user.toString() !== userId)
            return res.status(403).send({
                error: "Unauthorized access"
            });
        Product.updateOne({ _id: productId }, { $set: updatedProduct })
        .then(result => {
            return (result.n === 0) ? res.status(404).send({ error: 'Product does not exist' })
                : res.status(200).send({ message: 'Product updated' });
        })
        .catch(err => res.status(400).send({ 
            error: err.message 
        }));
    })
    .catch(err => res.status(400).send({ 
        error: err.message 
    }));
});

router.patch('/updateCart/:id', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    const cartId = req.params.id;
    const newQuantity = req.body.quantity;
    Cart.findOne({ _id: cartId })
    .then(cartToUpdate => {
        if (cartToUpdate.user.toString() !== userId)
            return res.status(403).send({
                error: "Unauthorized access"
            });
        Cart.updateOne({ _id: cartId }, { $set: { quantity: newQuantity }})
        .then(result => {
            return (result.n === 0) ? res.status(404).send({ error: 'Cart does not exist' })
                : res.status(200).send({ message: 'Cart updated' });
        })
        .catch(err => res.status(400).send({ 
            error: err.message 
        }));
    })
    .catch(err => res.status(400).send({ 
        error: err.message 
    }));
});

module.exports = router;