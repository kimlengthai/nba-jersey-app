// Import required packages and modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./configs/database');

// Import controller modules
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const paymentController = require('./controllers/paymentController');

// Middleware for role-based access control
const authorizeRole = require('./middleware/authorizeRole');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// User authentication routes
app.post('/login', userController.login); // Login
app.post('/register', userController.register); // Register new user

// Product catalog - public access
app.get('/products', productController.getProducts); // View products

// User orders
app.get('/orders', orderController.getOrders); // Get orders for current user

// /orders/all must be above /orders/:id
// because express routes are matched sequentially
app.get('/orders/all', authorizeRole(['staff']), orderController.getAllOrders); // Get all orders
// Get order by ID
app.get('/orders/:id', orderController.getOrdersById);
// Place a new order
app.post('/orders', orderController.placeOrder);
// Update user profile
app.put('/users/:id', userController.updateUser);
// Delete user account
app.delete('/users/:id', userController.deleteUser);
// Make a payment for an order
app.post('/payment', paymentController.makePayment);
// View payment history
app.get('/payments', paymentController.fetchPaymentHistory);

// Staff-only routes
// Staff: Create new product
app.post('/create-product', authorizeRole(['staff']), productController.createProduct);
// Staff: Delete payment by ID
app.delete('/payments/:id', authorizeRole(['staff']), paymentController.deletePayment);
// Staff: Delete an order from all users
app.delete('/orders/all/:id', authorizeRole(['staff']), orderController.deleteOrderAll);
// Staff: Delete specific order in Staff account in /orders route
app.delete('/orders/:id', authorizeRole(['staff']), orderController.deleteOrder);

// START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
{
  console.log(`Server running on port ${PORT}`);
});

// Rec: Use JTW for secure user verification instead of passing userId in headers
// Define routes in separate route files and import them here
// Centralize error handling using Express's app.use((err, req, res, next) => { . . . })