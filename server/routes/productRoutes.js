import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { isAdmin } from '../middleware/auth.js'; // Import your middleware

const router = express.Router();

// Apply isAdmin middleware to these routes
router.post('/products', isAdmin, createProduct);
router.put('/products/:id', isAdmin, updateProduct);
router.delete('/products/:id', isAdmin, deleteProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

export default router;
