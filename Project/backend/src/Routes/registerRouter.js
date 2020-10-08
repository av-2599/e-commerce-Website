const express = require('express')
const User = require('../models/user');

const router = express.Router();

router.post('/user', async (req, res) => {
    const newUser = req.body.user;
    const user = new User(newUser);
    await user.save();
    return res.status(201).send({id: user._id});
});

module.exports = router;