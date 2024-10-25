import express from 'express';
import { createPayment } from '../controllers/paymentController.js';

const router = express.Router();

// POST route for initiating a payment
router.post('/payment', createPayment);

export default router;
