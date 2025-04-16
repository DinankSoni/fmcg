import { Request, Response } from 'express';
import { Product } from '../models/productModel';
import { logger } from '../utils/logger';

// Get list of products with optional filters and pagination
export const getProducts = async (req: Request, res: Response) => {
  const { page = '1', limit = '10', category, priceMin, priceMax, name } = req.query;
  const query: any = {};

  // Add category filter to query
  if (category) query.category = category;

  // Add name filter with case-insensitive regex
  if (name) query.name = { $regex: name, $options: 'i' };

  // Add price range filter to query
  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = Number(priceMin);
    if (priceMax) query.price.$lte = Number(priceMax);
  }

  try {
    // Fetch products matching query with pagination
    const products = await Product.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate('createdBy', 'name');

    // Count total products matching query
    const total = await Product.countDocuments(query);

    // Return products and pagination info
    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    logger.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { name, category, price, stock, description } = req.body;
  try {
    // Create product with request data and user ID
    const product = new Product({
      name,
      category,
      price,
      stock,
      description,
      createdBy: req.user._id,
    });

    // Save product to database
    await product.save();
    logger.info(`Product created: ${name}`);

    // Return created product
    res.status(201).json(product);
  } catch (error) {
    logger.error('Create product error:', error);
    res.status(400).json({ error: 'Bad request' });
  }
};

// Get a single product by ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    // Fetch product by ID and populate createdBy field
    const product = await Product.findById(req.params.id).populate('createdBy', 'name');

    // Return 404 if product not found
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Return product details
    res.json(product);
  } catch (error) {
    logger.error('Get product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an existing product by ID
export const updateProduct = async (req: Request, res: Response) => {
  const { name, category, price, stock, description } = req.body;
  try {
    // Fetch product by ID
    const product = await Product.findById(req.params.id);

    // Return 404 if product not found
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Update product fields with request data or existing values
    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price !== undefined ? price : product.price;
    product.stock = stock !== undefined ? stock : product.stock;
    product.description = description || product.description;

    // Save updated product to database
    await product.save();
    logger.info(`Product updated: ${name}`);

    // Return updated product
    res.json(product);
  } catch (error) {
    console.error(error);
    logger.error('Update product error:', error);
    res.status(400).json({ error: 'Bad request' });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    // Delete product by ID
    const product = await Product.findByIdAndDelete(req.params.id);

    // Return 404 if product not found
    if (!product) return res.status(404).json({ error: 'Product not found' });

    logger.info(`Product deleted: ${product.name}`);

    // Return success message
    res.json({ message: 'Product deleted' });
  } catch (error) {
    logger.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
