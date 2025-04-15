import { checkSchema } from 'express-validator';

export const registerSchema = checkSchema({
  email: { isEmail: true, errorMessage: 'Invalid email' },
  password: { isLength: { options: { min: 6 } }, errorMessage: 'Password must be at least 6 characters' },
  name: { notEmpty: true, errorMessage: 'Name is required' },
  role: { isIn: { options: [['user', 'admin']] }, optional: true, errorMessage: 'Invalid role' },
});

export const loginSchema = checkSchema({
  email: { isEmail: true, errorMessage: 'Invalid email' },
  password: { notEmpty: true, errorMessage: 'Password is required' },
});