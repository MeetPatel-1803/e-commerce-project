import mongoose from 'mongoose';
import { USER_ROLE } from '../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.CUSTOMER
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String
    },
    googleId: { type: String, unique: true, sparse: true },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
