const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true
    },
    category: {
        type: String,
        maxLength: 255,
        required: true
    },
    description: {
        type: String,
        maxLength: 600,
        required: true
    },
    images: [{
        public_id: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
        },
    }, ],
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Product', ProductSchema);