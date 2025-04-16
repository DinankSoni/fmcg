import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

// Validate request data with given set of validations
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations and wait for them to complete
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return 400 with errors
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, call next middleware
    next();
  };
};
