import mongoose from 'mongoose';
import { logger } from '../utils/logger';

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI!);
    logger.info('MongoDB connected');
  } catch (error) {
    // Log the connection error and exit the process with failure
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
