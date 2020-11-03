const express = require('express');

const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const jwt = require('../config/jwt');

const router = express.Router();

// Delete product.
router.delete('/deleteProduct/:id', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    const productId = req.params.id;
    Product.findOne({ _id: productId })
    .then(productToDelete => {
        if (productToDelete.user.toString() !== userId)
            return res.status(403).send({
                error: "Unauthorized access"
            });
        Product.deleteOne({ _id: productId })
        .then(result => {
            return (result.n === 0) ? res.status(404).send({ error: 'Product does not exist' })
                : res.status(200).send({ message: 'Product deleted' });
        })
        .catch(err => res.status(400).send({ 
            error: err.message 
        }));
    })
    .catch(err => res.status(400).send({ 
        error: err.message 
    }));
});

// Delete user.
router.delete('/deleteUser', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    User.deleteOne({ _id: userId })
    .then(result => {
        return (result.n === 0) ? res.status(404).send({ error: 'User does not exist' })
            : res.status(200).send({ message: 'User deleted' });
    })
    .catch(err => res.status(400).send({ 
        error: err.message 
    }));
});

// Delete product from cart.
router.delete('/deleteCart/:id', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    const cartId = req.params.id;
    Cart.findOne({ _id:cartId })
    .then(cartToDelete => {
        if (cartToDelete.user.toString() !== userId) {
            return res.status(403).send({
                error: "Unauthorized access"
            });
        }
        Cart.deleteOne({ _id: cartId })
        .then(result => {
            return (result.n === 0) ? res.status(404).send({ error: 'Cart does not exist' })
                : res.status(200).send({ message: 'Cart deleted' });
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