import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    qty: Number,
    checked: Boolean,
    // Add other product fields as needed
  }],
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);