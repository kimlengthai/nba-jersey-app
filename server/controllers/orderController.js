const Order = require('../models/Order');
const mongoose = require('mongoose');
const User = require('../models/User');

// Fetch all orders for a user
exports.getOrders = async (req, res) => 
{
  try
  {
    const { userId } = req.query;
    console.log('Received userId:', userId);

    // Validate that userId is valid
    if (!userId || !mongoose.Types.ObjectId.isValid(userId))
    {
      return res.status(400).json({ status: "Error", message: 'Invalid or missing userId' });
    }

    // Find orders by userId, sort by most recent
    // and populate product's 'player' field
    const orders = await Order.find({ userId })
    // latest orders first
    .sort({ orderDate: -1 })
    // populate only the 'player' field
    .populate('items.productId', 'player');

    res.json(orders);
  }
  catch (error)
  {
    console.error('Error fetching orders:', error);
    res.status(500).json({ status: "Error", message: 'Server error', error: error.message });
  }
};

// [STAFF] Get all users' orders
exports.getAllOrders = async (req, res) => 
{
  try 
  {
    // Staff ID from custom request header
    const userId = req.header('x-user-id');

    // Balidate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) 
    {
      return res.status(400).json({ status: "Error", message: 'Invalid or missing userId' });
    }

    // Ensure the user exists and has the 'staff' role
    const user = await User.findById(userId);
    if (!user || user.role !== 'staff') 
    {
      return res.status(403).json({ status: "Error", message: 'Only staff can access this resource' });
    }

    // Fetch all orders and populate user names
    const orders = await Order.find().populate('userId', 'name');
    console.log(`Orders fetched by staff [${user.name}]: ${orders.length}`);
    res.status(200).json(orders); // Returns an array of orders
  } 
  catch (error) 
  {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};

// Fetch a particular order by its ID (for Checkout page)
exports.getOrdersById = async (req, res) => 
{
  try
  {
    const { id } = req.params;
    // Validate id format first
    if (!mongoose.Types.ObjectId.isValid(id))
    {
      return res.status(400).json({ status: "Error", message: 'Invalid order ID' });
    }
    // Fetch the order and populate product's 'player' field
    const order = await Order.findById(id).populate('items.productId', 'player');
    if (!order)
    {
      return res.status(404).json({ status: "Error", message: 'Order not found' });
    }
    res.json(order);
  }
  catch (error)
  {
    console.error('Error fetching order:', error);
    res.status(500).json({ status: "Error", message: 'Server error', error: error.message });
  }
};

// Place a new order
exports.placeOrder = async (req, res) => 
{
  try
  {
    const { userId, items, shippingAddress, totalAmount } = req.body;

    // Ensure all necessary order fields are present
    if (!userId || !items || !shippingAddress || !totalAmount)
    {
      return res.status(400).json({ status: "Error", message: 'Missing order details' });
    }

    // Create and save the new order to the database
    const order = await Order.create(
      {
        userId,
        items,
        shippingAddress,
        totalAmount
      }
    );
    // Respond with created order
    res.status(201).json(order);
  }
  catch (err)
  {
    res.status(400).json({ status: "Error", message: 'Failed to create order', error: err.message });
  }
};

// [STAFF] Delete staff's order in /orders route
// [STAFF] Delete users' orders in /orders/all route
const deleteOrderById = async (req, res) => 
{
  try 
  {
    const { id } = req.params;
    // Attempt to find and delete the order
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) 
    {
      return res.status(404).json({ status: "Error", message: "Order not found" });
    }
    res.json({ status: "Success", message: "Order deleted successfully", order: deletedOrder });
  }
  catch (err) 
  {
    res.status(500).json({ status: "Error", message: "Delete failed", error: err.message });
  }
};

// Reusable function for two endpoints
exports.deleteOrder = deleteOrderById; // For /orders/:id
exports.deleteOrderAll = deleteOrderById; // For /orders/all/:id