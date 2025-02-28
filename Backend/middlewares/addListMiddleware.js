import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory as buffer
export const upload = multer({ storage }).array("image", 5);

export const validateListing = (req, res, next) => {
  const { title, type, roomCount, description, location, size, area, public: isPublic } = req.body;

  if (!title || !type || !roomCount || !description || !location || !size || !area) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["Residential", "Office", "Warehouse"].includes(type)) {
    return res.status(400).json({ message: "Invalid property type" });
  }

  const validAreas = [
    "Dhanmondi",
    "Gulshan",
    "Banani",
    "Mirpur",
    "Uttara",
    "Bashundhara",
    "Mohammadpur",
    "Banasree",
    "Motijheel",
    "Shyamoli",
  ];

  if (!validAreas.includes(area)) {
    return res.status(400).json({ message: "Invalid area selected" });
  }

  if (isPublic !== undefined && typeof JSON.parse(isPublic) !== "boolean") {
    return res.status(400).json({ message: "Invalid value for public field" });
  }

  next();
};
