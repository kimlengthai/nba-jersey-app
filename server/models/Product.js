const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageBase64: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    team: { type: String, required: true },
    player: { type: String, required: true }
});

// collection: products
const Product = mongoose.model('Product', productSchema);
module.exports = Product;