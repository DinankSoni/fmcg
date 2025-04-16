import mongoose, { Schema } from 'mongoose';

// Define user schema with required fields
const userSchema = new Schema({
  // unique email address
  email: { type: String, required: true, unique: true },
  // hashed password
  password: { type: String, required: true },
  // user name
  name: { type: String, required: true },
  // user role: user or admin
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // timestamp when created
  createdAt: { type: Date, default: Date.now },
  // timestamp when updated
  updatedAt: { type: Date, default: Date.now },
});

// Update `updatedAt` before saving
userSchema.pre('save', function (next) {
  // set updatedAt to current date and time
  this.updatedAt = new Date();
  next();
});

// Export the user model
export const User = mongoose.model('User', userSchema);
