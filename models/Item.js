const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    price: {
        type: Number
    },
    color: {
        type: String
    },
    manufacturer: {
        type: String
    },
    isStock: {
        type: Boolean
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    rating: {
        type: Number
    }
});

module.exports = mongoose.model('Item', itemSchema);
