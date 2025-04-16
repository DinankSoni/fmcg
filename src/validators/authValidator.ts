import { checkSchema } from 'express-validator';

export const registerSchema = checkSchema({
  // validate email
  email: { isEmail: true, errorMessage: 'Invalid email' },
  // password must be at least 6 characters
  password: { isLength: { options: { min: 6 } }, errorMessage: 'Password must be at least 6 characters' },
  // name is required
  name: { notEmpty: true, errorMessage: 'Name is required' },
  // role is optional and must be 'user' or 'admin'
  role: { isIn: { options: [['user', 'admin']] }, optional: true, errorMessage: 'Invalid role' },
});

export const loginSchema = checkSchema({
  // validate email
  email: { isEmail: true, errorMessage: 'Invalid email' },
  // password is required
  password: { notEmpty: true, errorMessage: 'Password is required' },
});
