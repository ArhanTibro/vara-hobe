// middlewares/userMiddleware.js

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
