import { checkSchema } from 'express-validator';

export const updateProfileSchema = checkSchema({
  // name is required, but can be updated
  name: { notEmpty: true, optional: true, errorMessage: 'Name is required' },
  // password must be at least 6 characters, but can be left blank to skip update
  password: { isLength: { options: { min: 6 } }, optional: true, errorMessage: 'Password must be at least 6 characters' },
});
