import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import path from 'path';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import { logger } from './utils/logger';

dotenv.config(); // Load environment variables
const app = express();

connectDB(); // Connect to the database
app.use(express.json()); // Parse JSON bodies

const swaggerDocument = yamljs.load(path.join(__dirname, 'config/swagger.yaml'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger UI

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/products', productRoutes); // Product routes

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message); // Log the error
  res.status(500).json({ error: 'Internal server error' }); // Return a 500 error
});

export default app;
