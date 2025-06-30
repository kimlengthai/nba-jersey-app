const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => 
{
  try
  {
    const products = await Product.find();
    res.json(products);
  } catch (err)
  {
    res.status(500).json({ status: "Error", message: 'Failed to fetch products', error: err.message});
  }
};