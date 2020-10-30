const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    }
});

module.exports = mongoose.model('product', productSchema);