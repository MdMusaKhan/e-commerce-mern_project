import express from 'express';
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import mongoose from 'mongoose'; // Import mongoose for MongoDB connection
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Load environment variables
dotenv.config();

// Initialize the express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure code if MongoDB fails to connect
  });

// Use the routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: err.message
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
