// middlewares/userMiddleware.js
import jwt from 'jsonwebtoken';

export const validateSignup = (req, res, next) => {
  const { fullName, username, email, password, confirmPassword, phoneNumber, presentAddress } = req.body;

  if (!fullName || !username || !email || !password || !confirmPassword || !phoneNumber || !presentAddress) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  next();  // Move to the next function (controller)
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }

  next();  // Move to the next function (controller)
};


export const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Extracted Token:', token);  // Debugging token

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded Token:', decoded);  // Debugging decoded token
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
