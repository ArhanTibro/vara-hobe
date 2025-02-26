// middlewares/addListMiddleware.js
import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory as buffer
export const upload = multer({ storage }).array("image", 5);

export const validateListing = (req, res, next) => {
  const { title, type, roomCount, description, location, size } = req.body;

  if (!title || !type || !roomCount || !description || !location || !size) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["Residential", "Office", "Warehouse"].includes(type)) {
    return res.status(400).json({ message: "Invalid property type" });
  }

  next();
};
