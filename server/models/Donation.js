import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  donorEmail: String,
  donorName: String,
  paymentMethod: { type: String, enum: ['stripe', 'paypal'] },
  stripeSessionId: String,
  paypalOrderId: String,
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Donation', donationSchema);