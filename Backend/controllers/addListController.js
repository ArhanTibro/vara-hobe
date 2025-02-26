import List from "../models/AddList.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload images to Cloudinary
const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "image", folder: "vara-hobe" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

// 🏡 Add New Listing
export const addListing = async (req, res) => {
  const { title, type, roomCount, size, description, location } = req.body;
  
  try {
    let imagePaths = [];
    
    if (req.files && req.files.length > 0) {
      // Upload images to Cloudinary
      imagePaths = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, file.originalname))
      );
    }

    const newListing = new List({
      title,
      type,
      roomCount,
      size,
      description,
      location,
      image: imagePaths, // Store Cloudinary URLs
      seller: req.user.id,
    });

    await newListing.save();
    res.status(201).json({ message: "Listing added successfully", listing: newListing });
  } catch (error) {
    console.error("Add Listing Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📃 Get All Listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await List.find().populate("seller", "fullName phoneNumber presentAddress");
    res.status(200).json(listings);
  } catch (error) {
    console.error("Get Listings Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔍 Get Single Listing
export const getListingById = async (req, res) => {
  try {
    const listing = await List.findById(req.params.id).populate("seller", "fullName phoneNumber presentAddress");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(listing);
  } catch (error) {
    console.error("Get Listing Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✏️ Update Listing
export const updateListing = async (req, res) => {
  try {
    const listing = await List.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    let newImagePaths = listing.image; // Keep old images if no new images uploaded

    if (req.files && req.files.length > 0) {
      // 🗑️ Delete old images from Cloudinary
      await Promise.all(
        listing.image.map(async (url) => {
          const publicId = url.split("/").pop().split(".")[0];
          await cloudinary.v2.uploader.destroy(`vara-hobe/${publicId}`);
        })
      );

      // 🚀 Upload new images to Cloudinary
      newImagePaths = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, file.originalname))
      );
    }

    // ✅ Update listing details
    Object.assign(listing, req.body);
    listing.image = newImagePaths;
    
    await listing.save();
    res.status(200).json({ message: "Listing updated", listing });
  } catch (error) {
    console.error("Update Listing Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🗑️ Delete Listing
export const deleteListing = async (req, res) => {
  try {
    const listing = await List.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // 🗑️ Delete images from Cloudinary
    await Promise.all(
      listing.image.map(async (url) => {
        const publicId = url.split("/").pop().split(".")[0];
        await cloudinary.v2.uploader.destroy(`vara-hobe/${publicId}`);
      })
    );

    await List.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted" });
  } catch (error) {
    console.error("Delete Listing Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
