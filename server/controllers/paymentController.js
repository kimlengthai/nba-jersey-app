const Payment = require('../models/Payment');
const Order = require('../models/Order');
const mongoose = require('mongoose');

// Make a payment
exports.makePayment = async (req, res) => 
{
  try
  {
    // Extract payment and user details from request body
    const { orderId, userId, cardholderName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    // Validate all required fields are present
    if (!orderId || !userId || !cardholderName || !cardNumber || !expiryMonth || !expiryYear || !cvv)
    {
      return res.status(400).json({ status: "Error", message: 'Missing payment details' });
    }

    // Create a new payment record in the database
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

    // Respond with success and the payment details
    res.status(201).json({ status: "Success", message: 'Payment successful', payment });
  }
  catch (err)
  {
    console.error('Payment error:', err);
    res.status(500).json({ status: "Error", message: 'Payment failed', error: err.message });
  }
};

// FETCH PAYMENT HISTORY FOR A USER
exports.fetchPaymentHistory = async (req, res) => 
{
  try
  {
    const { userId } = req.query;

    // Validate userId format
    if (!userId || !mongoose.Types.ObjectId.isValid(userId))
    {
      return res.status(400).json({ status: "Error", message: 'Invalid or missing userId' });
    }

    // Find all payments by userId, sort by most recent, and populate total amount from the order
    const payments = await Payment.find({ userId })
    // Latest payments first
    .sort({ createdAt: -1 })
    // Populate totalAmount from order
    .populate('orderId', 'totalAmount')
    // Return plain javascript objects - Improve performance
    .lean();

    res.json(payments);
  }
  catch (err)
  {
    console.error('Error fetching payment history:', err);
    res.status(500).json({ status: "Error", message: 'Failed to fetch payments', error: err.message });
  }
};

// DELETE PAYMENT RECORD (STAFF ONLY)
exports.deletePayment = async (req, res) =>
{
  try
  {
    const { id } = req.params;

    // Find and delete the payment by its ID
    const deletedPayment = await Payment.findByIdAndDelete(id);
    // If the payment wasn't found, return a 404
    if (!deletedPayment)
    {
      return res.status(404).json({ status: "Error", message: "Payment not found" });
    }

    // Return success message with deleted payment details
    res.json({ status: "Success", message: "Payment record deleted successfully", payment: deletedPayment });
  }
  catch (err)
  {
    res.status(500).json({ status: "Error", message: "Delete failed", error: err.message });
  }
};

// Rec: Encrypt sensitive fields like cardNumber & cvv or never store them (comply with PCI DSS standards)
// Never return card details in responses
// Use a third-party payment gateway (Stripe, PayPal) to handle sensitive card data.