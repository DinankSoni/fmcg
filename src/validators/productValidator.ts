import { checkSchema } from 'express-validator';

// Validation schema for creating a product
export const createProductSchema = checkSchema({
  name: { notEmpty: true, errorMessage: 'Name is required' }, // product name is required
  category: { notEmpty: true, errorMessage: 'Category is required' }, // product category is required
  price: { isNumeric: true, errorMessage: 'Price must be a number' }, // price must be a number
  stock: { isInt: true, errorMessage: 'Stock must be an integer' }, // stock must be an integer
  description: { optional: true }, // description is optional
});

// Validation schema for updating a product
export const updateProductSchema = checkSchema({
  name: { notEmpty: true, optional: true, errorMessage: 'Name is required' }, // product name is required
  category: { notEmpty: true, optional: true, errorMessage: 'Category is required' }, // product category is required
  price: { isNumeric: true, optional: true, errorMessage: 'Price must be a number' }, // price must be a number
  stock: { isInt: true, optional: true, errorMessage: 'Stock must be an integer' }, // stock must be an integer
  description: { optional: true }, // description is optional
});
