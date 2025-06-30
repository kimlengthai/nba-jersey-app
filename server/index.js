const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./configs/database');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const paymentController = require('./controllers/paymentController');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// LOGIN ENDPOINT
app.post('/login', userController.login);
// REGISTER ENDPOINT
app.post('/register', userController.register);
// PUT endpoint to update user by ID
app.put('/users/:id', userController.updateUser);
// DELETE user
app.delete('/users/:id', userController.deleteUser);
// Fetch all products
app.get('/products', productController.getProducts);
// Fetch all orders for a user
app.get('/orders', orderController.getOrders);
// Fetch a particular order
app.get('/orders/:id', orderController.getOrdersById);
// PLACE AN ORDER ENDPOINT
app.post('/orders', orderController.placeOrder);
// Delete user's order
app.delete('/orders/:id', orderController.deleteOrder);
// PAYMENT ENDPOINT
app.post('/payment', paymentController.makePayment);
// FETCH PAYMENT HISTORY FOR A USER
app.get('/payments', paymentController.fetchPaymentHistory);

// START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
{
  console.log(`Server running on port ${PORT}`);
});