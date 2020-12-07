const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const jwt = require('../config/jwt');

const router = express.Router();

// Register.
router.post('/register', (req, res, next) => {
    let newUser = req.body.user;
    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err)
            return res.status(500).send({ message: 'Internal server Error' });
        else {
            newUser.password = hash;
            const user = new User(newUser);
            user.save()
            .then(() => res.status(201).send({ 
                id: user._id 
            }))
            .catch(err => res.status(417).send({ 
                error: err.message 
            }));
        }
    });
});

// Login.
router.post('/login', (req, res, next) => {
    let loginUser = req.body.user;
    console.log(loginUser);
    User.findOne({ email: loginUser.email })
    .then(user => {
        if (!user)
            return res.status(401).send({ 
                error: 'Authentication failed' 
            });
        else {
            bcrypt.compare(loginUser.password, user.password, (err, result) => {
                if (err || !result)
                    return res.status(401).send({ 
                        error: 'Authentication failed' 
                    });
                else {
                    const token = jwt.createToken({ 
                        userId: user._id
                    });
                    return res.status(200).send({ 
                        message: 'Authentication successful',
                        token: token
                    });
                }
            });
        }
    })
    .catch(err => res.status(500).send({ 
        error: err.message 
    }));
});

// Add product.
router.post('/addProduct', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    const {name, image, price, desc, quantity } = req.body.product;
    const product = new Product({
        user: userId,
        name,
        image,
        price,
        desc,
        quantity
    });
    product.save()
    .then(() => res.status(201).send({ 
        id: product._id
    }))
    .catch(err => res.status(417).send({ 
        error: err.message 
    }));
});

// Add to cart.
router.post('/addCart', jwt.validateToken, (req, res, next) => {
    const userId = req.session.userId;
    const { product, quantity } = req.body.cart;
    const cart = new Cart({
        user: userId,
        product,
        quantity
    });
    cart.save()
    .then(() => res.status(201).send({
        id: cart._id
    }))
    .catch(err => res.status(400).send({ 
        error: err.message 
    }));
});

// Search for a product
router.post('/searchProduct', (req, res, next) => {
    const productName = new RegExp(req.body.name);
    Product.find({ name: productName })
    .then(result => {
        console.log(result);
        res.status(200).send({
            message: result
        })
    })
    .catch(err => res.status(400).send({
        error: err.message
    }));
});

// Get specific user
router.post('/getUser', (req, res, next) => {
    const userEmail = req.body.email;
    User.findOne({ email: userEmail })
    .then(result => {
        (result) ? res.status(200).send({ message: "Good" }) :
            res.status(400).send({ error: "Email does not exist" });
    })
    .catch(err => res.status(400).send({
        error: err.message
    }));
});

module.exports = router;
