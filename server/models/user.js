import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",  // Default role set to "user"
  },
  isAdmin: {
    type: Boolean,
    default: false,  // Default isAdmin set to false
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", userSchema);
