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

// CREATE NEW PRODUCT (STAFF ONLY)
exports.createProduct = async (req, res) =>
{
  try
  {
    const { image, team, player, price } = req.body;

    if (!image || !team || !player || !price)
    {
      return res.status(400).json({ status: "Error", message: "Missing product details" });
    }

    if (typeof price !== 'number' || price <= 0)
    {
      return res.status(400).json({ status: "Error", message: "Price must be a positive number" });
    }

    const newProduct = await Product.create({ image, team, player, price });

    res.status(201).json({ status: "Success", product: newProduct });
  }
  catch (err)
  {
    res.status(500).json({ status: "Error", message: "Failed to create product", error: err.message });
  }
};