import jwt from 'jsonwebtoken';

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  
  if (!token) {
    return res.status(403).json({
      status: "failed",
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.user = decoded; // Attach user info to the request

    if (!req.user.isAdmin) { // Check if the user is an admin
      return res.status(403).json({
        status: "failed",
        success: false,
        message: "Access denied. You are not an admin.",
      });
    }

    next(); // Proceed to the next middleware/controller
  } catch (err) {
    res.status(400).json({
      status: "failed",
      success: false,
      message: "Invalid token.",
      error: err.message,
    });
  }
};
