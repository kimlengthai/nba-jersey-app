const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');

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
      return res.status(404).json({ status: "Error", message: "User not found" });
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

// START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
{
  console.log(`Server running on port ${PORT}`);
});