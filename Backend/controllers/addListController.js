// controllers/addListController.js
import List from '../models/AddList.js';
import path from 'path';
import fs from 'fs';

export const addListing = async (req, res) => {
  const { title, type, roomCount, description, location } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newListing = new List({
      title,
      type,
      roomCount,
      size,
      description,
      location,
      image: imagePath, // Store file path
      seller: req.user.id
    });

    await newListing.save();
    res.status(201).json({ message: 'Listing added successfully', listing: newListing });
  } catch (error) {
    console.error('Add Listing Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await List.find().populate('seller', 'fullName phoneNumber presentAddress');
    res.status(200).json(listings);
  } catch (error) {
    console.error('Get Listings Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await List.findById(req.params.id).populate('seller', 'fullName phoneNumber presentAddress');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.status(200).json(listing);
  } catch (error) {
    console.error('Get Listing Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateListing = async (req, res) => {
  try {
    const listing = await List.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    
    if (req.file) {
      // Delete old image if exists
      if (listing.image) {
        const oldImagePath = path.join("public", listing.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      listing.image = `/uploads/${req.file.filename}`;
    }
    
    Object.assign(listing, req.body);
    await listing.save();
    res.status(200).json({ message: 'Listing updated', listing });
  } catch (error) {
    console.error('Update Listing Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await List.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    
    // Delete image file
    if (listing.image) {
      const imagePath = path.join("public", listing.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing deleted' });
  } catch (error) {
    console.error('Delete Listing Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
