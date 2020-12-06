const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
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