const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardholderName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryMonth: { type: String, required: true },
  expiryYear: { type: String, required: true },
  // In real systems, we do not store CVV
  cvv: { type: String, required: true }
},
{
    // Add createdAt and updatedAt fields
    timestamps: true
}
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;