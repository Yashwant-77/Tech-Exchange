import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  // Add price, status, etc. as needed
});

export default mongoose.model('Purchase', purchaseSchema);