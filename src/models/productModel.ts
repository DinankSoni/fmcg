import mongoose, { Schema } from 'mongoose';

// Define product schema with required fields
const productSchema = new Schema({
  name: { type: String, required: true }, // product name
  category: { type: String, required: true }, // product category
  price: { type: Number, required: true }, // product price
  stock: { type: Number, required: true }, // product stock quantity
  description: { type: String }, // product description
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // user ID who created the product
  createdAt: { type: Date, default: Date.now }, // timestamp when created
  updatedAt: { type: Date, default: Date.now }, // timestamp when updated
});

// Update `updatedAt` before saving
productSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Export the product model
export const Product = mongoose.model('Product', productSchema);
