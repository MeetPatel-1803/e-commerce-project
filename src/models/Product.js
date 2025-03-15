import mongoose from 'mongoose';
import { TAGS } from '../utils/constants.js';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [String],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: String, enum: TAGS }],
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
