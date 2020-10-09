const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: String,
        ref: 'user',
        field: 'userName'
    }
});

module.exports = mongoose.model('cart', cartSchema);