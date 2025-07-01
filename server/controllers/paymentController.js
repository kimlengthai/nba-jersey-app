const Payment = require('../models/Payment');
const Order = require('../models/Order');
const mongoose = require('mongoose');

// PAYMENT ENDPOINT
exports.makePayment = async (req, res) => 
{
  try
  {
    const { orderId, userId, cardholderName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    if (!orderId || !userId || !cardholderName || !cardNumber || !expiryMonth || !expiryYear || !cvv)
    {
      return res.status(400).json({ status: "Error", message: 'Missing payment details' });
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

    if (!userId || !mongoose.Types.ObjectId.isValid(userId))
    {
      return res.status(400).json({ status: "Error", message: 'Invalid or missing userId' });
    }

    const payments = await Payment.find({ userId })
    // Latest payments first
    .sort({ createdAt: -1 })
    // Populate totalAmount from order
    .populate('orderId', 'totalAmount')
    // Improve performance
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

    const deletedPayment = await Payment.findByIdAndDelete(id);
    if (!deletedPayment)
    {
      return res.status(404).json({ status: "Error", message: "Payment not found" });
    }

    res.json({ status: "Success", message: "Payment record deleted successfully", payment: deletedPayment });
  }
  catch (err)
  {
    res.status(500).json({ status: "Error", message: "Delete failed", error: err.message });
  }
};