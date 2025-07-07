const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => 
{
  try
  {
    // Fetch all products from the database
    const products = await Product.find();
    // Respond with the list of products
    res.json(products);
  } catch (err)
  {
    // Handle server/database errors
    res.status(500).json({ status: "Error", message: 'Failed to fetch products', error: err.message});
  }
};

// CREATE NEW PRODUCT (STAFF ONLY)
exports.createProduct = async (req, res) =>
{
  try
  {
    // Destructure required fields from the request body
    const { imageBase64, imageUrl, price, team, player } = req.body;

    // Validate required fields
    if (!imageBase64 || !imageUrl || !price || !team || !player)
    {
      return res.status(400).json({ status: "Error", message: "Missing product details" });
    }

    // validate that price is a positive number
    if (typeof price !== 'number' || price <= 0)
    {
      return res.status(400).json({ status: "Error", message: "Price must be a positive number" });
    }

    // Create and save the new product in the database
    const newProduct = await Product.create({ imageBase64, imageUrl, team, player, price });

    // Respond with the newly created product
    res.status(201).json({ status: "Success", product: newProduct });
  }
  catch (err)
  {
    // Handle creation errors
    res.status(500).json({ status: "Error", message: "Failed to create product", error: err.message });
  }
};