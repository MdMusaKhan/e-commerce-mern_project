// controllers/paymentController.js
import Stripe from 'stripe';
import Product from '../models/Product.js'; // Ensure the correct import path and case

const stripe = new Stripe('your_secret_key'); // Replace with your actual secret key

// Create a payment intent
export const createPayment = async (req, res) => {
    const { productId, token } = req.body; // Get product ID and payment token from the request
    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "failed", message: "Product not found." });
        }

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.price * 100, // Amount in cents
            currency: 'usd', // Replace with your desired currency
            payment_method: token, // Use the payment token received from the frontend
            confirmation_method: 'manual',
            confirm: true,
        });

        // Respond with success
        res.status(200).json({
            status: "success",
            message: "Payment successful",
            paymentIntent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed", message: "Payment failed.", error: error.message });
    }
};
