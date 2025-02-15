// middlewares/addListMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';





// Ensure uploads directory exists
const uploadDir = path.join("public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage }).array('image', 5);


export const validateListing = (req, res, next) => {
  const { title, type, roomCount, description, location, size } = req.body;

  if (!title || !type || !roomCount || !description || !location || !size) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['Residential', 'Office', 'Warehouse'].includes(type)) {
    return res.status(400).json({ message: 'Invalid property type' });
  }

  next();
};