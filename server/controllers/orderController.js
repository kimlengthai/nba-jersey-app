const Order = require('../models/Order');
const mongoose = require('mongoose');

// Fetch all orders for a user
exports.getOrders = async (req, res) => 
{
  try
  {
    const { userId } = req.query;
    console.log('Received userId:', userId);

    if (!userId || !mongoose.Types.ObjectId.isValid(userId))
    {
      return res.status(400).json({ status: "Error", message: 'Invalid or missing userId' });
    }

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

// STAFF: Get all orders from all users
// exports.getAllOrders = async (req, res) => 
// {
//   console.log("👀 getAllOrders called");
//   console.log("Headers received:", req.headers);

//   try 
//   {
//     const orders = await Order.find()
//       .sort({ orderDate: -1 })
//       .populate('userId', 'name email');

//     console.log("✅ Orders fetched:", orders.length);
//     res.json(orders);
//   } 
//   catch (error) 
//   {
//     console.error("❌ Error inside getAllOrders:", error);
//     res.status(500).json({ status: "Error", message: "Failed to fetch all orders", error: error.message });
//   }
// };

// Fetch a particular order
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
    // Populate product name in order items
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

// PLACE AN ORDER ENDPOINT
exports.placeOrder = async (req, res) => 
{
  try
  {
    const { userId, items, shippingAddress, totalAmount } = req.body;

    if (!userId || !items || !shippingAddress || !totalAmount)
    {
      return res.status(400).json({ status: "Error", message: 'Missing order details' });
    }

    const order = await Order.create(
      {
        userId,
        items,
        shippingAddress,
        totalAmount
      }
    );
    res.status(201).json(order);
  }
  catch (err)
  {
    res.status(400).json({ status: "Error", message: 'Failed to create order', error: err.message });
  }
};

// Delete user's order
exports.deleteOrder = async (req, res) => 
{
  try 
  {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) 
    {
      return res.status(404).json({ status: "Error", message: "Order not found" });
    }
    res.json({ status: "Success", message: "Order deleted successfully", order: deletedOrder });
  } catch (err) 
  {
    res.status(500).json({ status: "Error", message: "Delete failed", error: err.message });
  }
};