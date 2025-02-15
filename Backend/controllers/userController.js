// controllers/userController.js

import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// User Signup Controller
export const signupUser = async (req, res) => {
  const { fullName, username, email, password, phoneNumber, presentAddress } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    const newUser = new User({
      fullName,
      username,
      email,
      password,
      phoneNumber,
      presentAddress
    });

    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { username, email }, 
      accessToken,
      refreshToken
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({ 
      message: 'Login successful', 
      user: { username: user.username, email: user.email }, 
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Refresh Token Controller
export const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Refresh Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Refresh Token' });

    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ accessToken: newAccessToken });
  });
};
