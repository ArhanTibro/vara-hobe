import List from "../models/AddList.js";
import Payment from "../models/Payment.js"; // Import the Payment model
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { Types } from "mongoose";
import SSLCommerzPayment from "sslcommerz-lts";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// SSLCommerz configuration
const SSL_IS_SANDBOX = process.env.SSL_IS_SANDBOX === "true";
const SSL_STORE_ID = process.env.SSL_STORE_ID;
const SSL_STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
const API_BASE_URL = process.env.API_BASE_URL;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

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
  const { title, type, roomCount, size, description, location, area, rent } =
    req.body;

  try {
    let imagePaths = [];

    if (req.files && req.files.length > 0) {
      // Upload images to Cloudinary
      imagePaths = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer, file.originalname)
        )
      );
    }

    const newListing = new List({
      title,
      type,
      roomCount,
      size,
      rent,
      description,
      location,
      area,
      image: imagePaths,
      seller: req.user.id,
      access: null,
    });

    await newListing.save();
    res
      .status(201)
      .json({ message: "Listing added successfully", listing: newListing });
  } catch (error) {
    console.error("Add Listing Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📃 Get All Listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await List.find().populate(
      "seller",
      "fullName phoneNumber presentAddress"
    );
    res.status(200).json(listings);
  } catch (error) {
    console.error("Get Listings Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔍 Get Single Listing
export const getListingById = async (req, res) => {
  try {
    const listing = await List.findById(req.params.id).populate(
      "seller",
      "fullName phoneNumber presentAddress"
    );
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
        req.files.map((file) =>
          uploadToCloudinary(file.buffer, file.originalname)
        )
      );
    }

    // ✅ Update listing details (excluding `access`)
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

// 💳 Initiate Payment for Listing
export const purchaseListing = async (req, res) => {
  const { listingId } = req.params;
  const listing = await List.findById(listingId);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  const tranId = new Types.ObjectId().toString();
  const data = {
    total_amount: listing.rent,
    currency: "BDT",
    tran_id: tranId,
    success_url: `${API_BASE_URL}/listings/payment-success/${tranId}`,
    fail_url: `${API_BASE_URL}/listings/payment-fail/${tranId}`,
    cancel_url: `${API_BASE_URL}/listings/payment-cancel/${tranId}`,
    shipping_method: "Courier",
    product_name: listing.title,
    product_category: listing.type,
    product_profile: "general",
    cus_name: req.user.fullName,
    cus_email: req.user.email,
    cus_add1: listing.location,
    cus_add2: listing.location,
    cus_city: listing.area,
    cus_state: listing.area,
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: req.user.phoneNumber,
    cus_fax: req.user.phoneNumber,
    ship_name: req.user.fullName,
    ship_add1: listing.location,
    ship_add2: listing.location,
    ship_city: listing.area,
    ship_state: listing.area,
    ship_postcode: "1000",
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(
    SSL_STORE_ID,
    SSL_STORE_PASSWORD,
    SSL_IS_SANDBOX
  );
  sslcz
    .init(data)
    .then(async (apiResponse) => {
      console.log("SSLCommerz API Response:", apiResponse); // 🔍 Debugging log
      let gatewayPageURL = apiResponse.GatewayPageURL;
      const newPayment = await Payment.create({
        transactionId: tranId,
        listingId: listing._id,
        amount: listing.rent,
        payer: req.user.id,
        status: "pending",
      });
      return res.status(200).json({ paymentUrl: gatewayPageURL });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Payment initiation failed" });
    });
};

// ✅ Handle Payment Success
export const successPayment = async (req, res) => {
  const { tranId } = req.params;
  await Payment.findOneAndUpdate(
    { transactionId: tranId },
    { status: "success" }
  );
  return res.redirect(`${ALLOWED_ORIGIN}/payment-success`);
};

// ❌ Handle Payment Failure
export const failPayment = async (req, res) => {
  const { tranId } = req.params;
  await Payment.findOneAndUpdate(
    { transactionId: tranId },
    { status: "failed" }
  );
  return res.redirect(`${ALLOWED_ORIGIN}/payment-fail`);
};

// 🚫 Handle Payment Cancellation
export const cancelPayment = async (req, res) => {
  const { tranId } = req.params;
  await Payment.findOneAndUpdate(
    { transactionId: tranId },
    { status: "canceled" }
  );
  return res.redirect(`${ALLOWED_ORIGIN}/payment-cancel`);
};

// 📜 Get All Payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate("listingId payer");
    res.status(200).json(payments);
  } catch (error) {
    console.error("Get Payments Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔑 Grant Access to Listing
export const setListingAccess = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const listing = await List.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    listing.access = userId; // Assign access to the specified user
    await listing.save();

    res.status(200).json({ message: "Access updated successfully", listing });
  } catch (error) {
    console.error("Set Listing Access Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
