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
      user: { username, email, role: newUser.role, rating: newUser.rating }, 
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
      user: { username: user.username, email: user.email, role: user.role, rating: user.rating }, 
      accessToken
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
