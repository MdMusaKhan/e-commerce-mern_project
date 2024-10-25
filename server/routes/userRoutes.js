import express from 'express';
import { createNewUser, getUser, updateUser } from '../controllers/UserController.js';
import { loginUser } from '../controllers/LoginController.js';

const router = express.Router();

// POST route to create a new user
router.post('/register', createNewUser);

// POST route to login a user
router.post('/login', loginUser);

// PUT route to update a user profile (if applicable)
router.put('/users/:id', updateUser);

// GET route to get user info (if needed)
router.get('/users/:id', getUser);

export default router;
