import { checkSchema } from 'express-validator';

export const updateProfileSchema = checkSchema({
  email: { isEmail: true, optional: true, errorMessage: 'Invalid email' },
  name: { notEmpty: true, optional: true, errorMessage: 'Name is required' },
});