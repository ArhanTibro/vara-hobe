import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Function to generate JWT token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email, role: user.role, rating: user.rating },
    process.env.JWT_SECRET,
    { expiresIn: '5h' } // Token expires in 5 hours
  );
};

// User Signup Controller
export const signupUser = async (req, res) => {
  const { fullName, username, email, password, phoneNumber, presentAddress } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    // Create new user with default role and rating
    const newUser = new User({
      fullName,
      username,
      email,
      password,
      phoneNumber,
      presentAddress,
      role: "user", // Role is hardcoded
      rating: 0 // Default rating
    });

    await newUser.save();

    const accessToken = generateAccessToken(newUser);

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { id: newUser._id, username, email, role: newUser.role, rating: newUser.rating }, 
      accessToken
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// User Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const accessToken = generateAccessToken(user);

    res.status(200).json({ 
      message: 'Login successful', 
      user: { id: user._id, username: user.username, email: user.email, role: user.role, rating: user.rating }, 
      accessToken
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Search users by username
export const searchUsers = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "Username query parameter is required" });
  }

  try {
    const users = await User.find({ username: { $regex: username, $options: "i" } })
      .select("username fullName email")
      .limit(10); // Limit results to 10 users

    res.status(200).json(users);
  } catch (error) {
    console.error("Search Users Error:", error);
    res.status(500).json({ message: "Failed to search users" });
  }
};


// userController.js
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Get another user's profile by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Rate another user
export const rateUser = async (req, res) => {
  const { userId } = req.params;
  const { rating } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's rating (example: average rating)
    const totalRatings = user.rating * user.ratingCount;
    const newRatingCount = user.ratingCount + 1;
    const newRating = (totalRatings + rating) / newRatingCount;

    user.rating = newRating;
    user.ratingCount = newRatingCount;
    await user.save();

    res.status(200).json({ message: "Rating submitted successfully", user });
  } catch (error) {
    console.error("Rate User Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};