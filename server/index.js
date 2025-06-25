const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Payment = require('./models/Payment');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// LOGIN ENDPOINT
app.post('/login', async (req, res) => 
{
  const { email, password } = req.body;

  try 
  {
    const user = await UserModel.findOne({ email });

    if (!user) 
    {
      return res.status(404).json({ status: "Error", message: "Incorrect email and password. Please try again." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) 
    {
      return res.status(401).json({ status: "Error", message: "Incorrect password" });
    }

    res.json({ status: "Success", user });
  } catch (err) 
  {
    res.status(500).json({ status: "Error", message: "Server error", error: err.message });
  }
});

// REGISTER ENDPOINT
app.post('/register', async (req, res) => 
{
  try 
  {
    const { name, email, password, shippingAddress } = req.body;

    if (!shippingAddress || typeof shippingAddress !== 'object') 
    {
      return res.status(400).json({ status: "Error", message: "Shipping address is missing or invalid." });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hash,
      shippingAddress
    });

    res.status(201).json(user);
  } catch (err) 
  {
    res.status(400).json({ status: "Error", message: "Registration failed", error: err.message });
  }
});

// PUT endpoint to update user by ID
app.put('/users/:id', async (req, res) => 
{
  try 
  {
    const { id } = req.params;
    const updateData = req.body;

    // Find user by ID and update with new data, return the updated document
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) 
    {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) 
  {
    res.status(500).json({ status: "Error", message: "Update failed", error: err.message });
  }
});

// DELETE user
app.delete('/users/:id', async (req, res) => 
{
  try 
  {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) 
    {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }
    res.json({ status: "Success", message: "User deleted successfully", user: deletedUser });
  } catch (err) 
  {
    res.status(500).json({ status: "Error", message: "Delete failed", error: err.message });
  }
});

// Get all products
app.get('/products', async (req, res) => 
{
  try
  {
    const products = await Product.find();
    res.json(products);
  } catch (err)
  {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message});
  }
});

// Fetch all orders for a user
app.get('/orders', async (req, res) => 
{
  try
  {
    const { userId } = req.query;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId))
    {
      return res.status(400).json({ message: 'Invalid or mising userId' });
    }

    const orders = await Order.find({ userId })
    .sort({ orderDate: -1 }) // latest orders first
    .populate('items.productId', 'player'); // populate only the 'player' field

    res.json(orders);
  }
  catch (error)
  {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Fetch a particular order
app.get('/orders/:id', async (req, res) => 
{
  try
  {
    const { id } = req.params;
    // Validate id format first
    if (!mongoose.Types.ObjectId.isValid(id))
    {
      return res.status(400).json({ message: 'Invalid order ID' });
    }
    // Populate product name in order items
    const order = await Order.findById(id).populate('items.productId', 'player');
    if (!order)
    {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  }
  catch (error)
  {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PLACE AN ORDER ENDPOINT
app.post('/orders', async (req, res) => 
{
  try
  {
    const { userId, items, shippingAddress, totalAmount } = req.body;

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
    res.status(400).json({ message: 'Failed to create order', error: err.message });
  }
});

// Delete user's order
app.delete('/orders/:id', async (req, res) => 
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
});

// PAYMENT ENDPOINT
app.post('/payment', async (req, res) => 
{
  try
  {
    const { orderId, userId, cardholderName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    if (!orderId || !userId || !cardholderName || !cardNumber || !expiryMonth || !expiryYear || !cvv)
    {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    // Save payment details
    const payment = await Payment.create(
      {
        orderId,
        userId,
        cardholderName,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv
      }
    );

    // Update order status to 'Completed'
    await Order.findByIdAndUpdate(orderId, { status: 'Completed' });

    res.status(201).json({ message: 'Payment successful', payment });
  }
  catch (err)
  {
    console.error('Payment error:', err);
    res.status(500).json({ message: 'Payment failed', error: err.message });
  }
});

// START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
{
  console.log(`Server running on port ${PORT}`);
});