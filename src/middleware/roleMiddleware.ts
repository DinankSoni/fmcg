import { Request, Response, NextFunction } from 'express';

export const restrictTo = (...roles: string[]) => {
  // Check if user is logged in and has one of the allowed roles
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      // Forbidden if user is not logged in or does not have required role
      return res.status(403).json({ error: 'Forbidden' });
    }
    // Call next middleware function if user is allowed
    next();
  };
};
