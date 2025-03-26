import mongoose from 'mongoose';
import { RATINGS } from '../utils/constants.js';

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: RATINGS.MIN, max: RATINGS.MAX, required: true },
    comment: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
