const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./configs/database');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const paymentController = require('./controllers/paymentController');
// const authorizeRole = require('./middleware/authorizeRole');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Public routes
app.post('/login', userController.login);
app.post('/register', userController.register);
app.get('/products', productController.getProducts);
app.get('/orders', orderController.getOrders);
// /orders/all must be above /orders/:id
// because express routes are matched sequentially
app.get('/orders/all', orderController.getAllOrders);
app.get('/orders/:id', orderController.getOrdersById);
app.post('/orders', orderController.placeOrder);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);
app.post('/payment', paymentController.makePayment);
app.get('/payments', paymentController.fetchPaymentHistory);

// Staff-only routes
// app.post('/products', authorizeRole('staff'), productController.createProduct);
// app.delete('/payments/:id', authorizeRole('staff'), paymentController.deletePayment);
// app.delete('/orders/:id', authorizeRole('staff'), orderController.deleteOrder);
// app.get('/orders/all', authorizeRole('staff'), orderController.getAllOrders);
// app.get('/orders/all', authorizeRole(['staff', 'user']), orderController.getAllOrders);
// app.get('/orders/all', orderController.getAllOrders);
// app.get('/orders/all', (req, res) => 
// {
//   res.status(200).json({ message: "Orders route working" });
// });

// START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
{
  console.log(`Server running on port ${PORT}`);
});