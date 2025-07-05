const User = require('../models/User');
const bcrypt = require('bcrypt');

// LOGIN ENDPOINT
exports.login = async (req, res) => 
{
  const { email, password } = req.body;

  try 
  {
    // Look up user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) 
    {
      return res.status(404).json({ status: "Error", message: "Incorrect email and password. Please try again." });
    }

    // Compare provided password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) 
    {
      return res.status(401).json({ status: "Error", message: "Incorrect password" });
    }

    // Remove password field from user object before sending the response
    const userSafe = user.toObject();
    delete userSafe.password;

    // Respond with authenticated user data
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

    // Validate shipping address presence and type
    if (!shippingAddress || typeof shippingAddress !== 'object') 
    {
      return res.status(400).json({ status: "Error", message: "Shipping address is missing or invalid." });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) 
    {
      return res.status(400).json({ status: "Error", message: "Email already registered." });
    }

    // Hash the password for seure storage
    const hash = await bcrypt.hash(password, 10);

    // Create new user with default role 'user'
    const user = await User.create({
      name,
      email,
      password: hash,
      shippingAddress,
      role: 'user' 
    });

    // Exclude password from response
    const userSafe = user.toObject();
    delete userSafe.password;

    // Respond with newly created user
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
    // User ID from route parameter
    const { id } = req.params;
    // Updated fields from request body
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

// DELETE user by ID
exports.deleteUser = async (req, res) => 
{
  try 
  {
    const { id } = req.params;
    // Attempt to delete user by ID
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

// Rec: Token-Based Authentication: Consider returning a JTW on successful login instead of just user data
// Password validation: Add stricter password rules
// Access control: Restrict updateUser and deleteUser to the account owner or staff roles via middleware