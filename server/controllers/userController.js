import User from '../models/User.js';  
import bcrypt from 'bcryptjs'; // Ensure you're using bcryptjs for hashing

// 1. Create a new user
export const createNewUser = async (req, res) => {
  const { username, email, password, role, photo } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
      role: role || "user",  // Default to "user" if not provided
      photo,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      status: "success",
      success: true,
      message: "User Successfully Created",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      success: false,
      message: "User Cannot be Created. Try again",
      error: err.message,
    });
  }
};


// 2. Get user by ID (Example implementation)
export const getUser = async (req, res) => {
  const { id } = req.params; // Assuming you're passing user ID in the URL
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      status: "success",
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      success: false,
      message: "Error retrieving user",
      error: err.message,
    });
  }
};

// 3. Update user (Example implementation)
export const updateUser = async (req, res) => {
  const { id } = req.params; // Assuming you're passing user ID in the URL
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      status: "success",
      success: true,
      message: "User Successfully Updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      success: false,
      message: "User Cannot be Updated. Try again",
      error: err.message,
    });
  }
};
