const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    team: { type: String, required: true },
    player: { type: String, required: true }
});

// collection: products
module.exports = mongoose.model('Product', productSchema);