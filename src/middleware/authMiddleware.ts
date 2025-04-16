import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';

declare global {
  namespace Express {
    // Extend the Express Request interface to include a user property
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  // If no token is provided, return a 401 status code
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    // Verify the token using the JWT_SECRET environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    // Find the user by the decoded ID, excluding the password field
    const user = await User.findById(decoded.id).select('-password');
    // If the user is not found, return a 401 status code
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    // Assign the user to the request object
    req.user = user;
    // Call the next middleware function
    next();
  } catch (error) {
    // If there is an error, return a 401 status code
    res.status(401).json({ error: 'Unauthorized' });
  }
};
