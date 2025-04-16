import { Router } from 'express';
import { getProducts, createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';
import { restrictTo } from '../middleware/roleMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { createProductSchema, updateProductSchema } from '../validators/productValidator';

const router = Router();

// Get list of products with optional filters and pagination
router.get('/', authMiddleware, getProducts);
// Create a new product (admin only)
router.post('/', authMiddleware, restrictTo('admin'), validate(createProductSchema), createProduct);
// Get a single product by ID
router.get('/:id', authMiddleware, getProduct);
// Update an existing product by ID (admin only)
router.put('/:id', authMiddleware, restrictTo('admin'), validate(updateProductSchema), updateProduct);
// Delete a product by ID (admin only)
router.delete('/:id', authMiddleware, restrictTo('admin'), deleteProduct);

export default router;
