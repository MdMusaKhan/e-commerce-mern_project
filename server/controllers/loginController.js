import User from '../models/User.js';
import bcrypt from 'bcryptjs'; // Ensure this matches the one used for registration
import jwt from 'jsonwebtoken'; // For generating JWT token (optional)

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "User not found",
      });
    }

    // 2. Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({
        status: "failed",
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3. Optionally, create and return a JWT token for authentication
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET, // Ensure this is set in your environment
      { expiresIn: '1h' }     // Token expiration time
    );

    // 4. Return the success response
    res.status(200).json({
      status: "success",
      success: true,
      message: "Login successful",
      token, // Return the token for authentication
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
