const User = require('../models/User');
const bcrypt = require('bcrypt');

// LOGIN ENDPOINT
exports.login = async (req, res) => 
{
  const { email, password } = req.body;

  try 
  {
    const user = await User.findOne({ email });

    if (!user) 
    {
      return res.status(404).json({ status: "Error", message: "Incorrect email and password. Please try again." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) 
    {
      return res.status(401).json({ status: "Error", message: "Incorrect password" });
    }

    const userSafe = user.toObject();
    delete userSafe.password;

    res.json({ status: "Success", user: userSafe });
  } catch (err) 
  {
    res.status(500).json({ status: "Error", message: "Server error", error: err.message });
  }
};


// REGISTER ENDPOINT
exports.register = async (req, res) => 
{
  try 
  {
    const { name, email, password, shippingAddress } = req.body;

    if (!shippingAddress || typeof shippingAddress !== 'object') 
    {
      return res.status(400).json({ status: "Error", message: "Shipping address is missing or invalid." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) 
    {
      return res.status(400).json({ status: "Error", message: "Email already registered." });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      shippingAddress,
      role: 'user' 
    });

    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(201).json({ status: "Success", user: userSafe });
  } 
  catch (err) 
  {
    res.status(400).json({ status: "Error", message: "Registration failed", error: err.message });
  }
};

// PUT endpoint to update user by ID
exports.updateUser = async (req, res) => 
{
  try 
  {
    const { id } = req.params;
    const updateData = req.body;

    // Find user by ID and update with new data, return the updated document
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) 
    {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }

    res.status(200).json({ status: "Success", user: updatedUser });
  } catch (err) 
  {
    res.status(500).json({ status: "Error", message: "Update failed", error: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => 
{
  try 
  {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) 
    {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }
    res.json({ status: "Success", message: "User deleted successfully", user: deletedUser });
  } catch (err) 
  {
    res.status(500).json({ status: "Error", message: "Delete failed", error: err.message });
  }
};