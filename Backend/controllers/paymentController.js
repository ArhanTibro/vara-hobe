import mongoose from "mongoose";
import SSLCommerzPayment from "sslcommerz-lts";
import dotenv from "dotenv";
import { Types } from "mongoose";
import AddList from "../models/AddList.js";
import Payment from "../models/Payment.js";

dotenv.config();

// Environment variables
const SSL_IS_SANDBOX = process.env.SSL_IS_SANDBOX === "true";
const SSL_STORE_ID = process.env.SSL_STORE_ID;
const SSL_STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
const API_BASE_URL = process.env.API_BASE_URL;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

/**
 * Generate SSL Payment URL
 */
export const generateSslPayment = async (req, res) => {
  try {
    const listId = req.params.listId.trim();

    // Validate listing ID
    if (!Types.ObjectId.isValid(listId)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    // Fetch the property listing
    const addList = await AddList.findById(listId).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!addList) {
      return res.status(404).json({ message: "Property listing not found" });
    }

    // Generate a unique transaction ID
    const transactionId = new Types.ObjectId().toString();

    // Set payment amount (you can fetch this dynamically from `addList` if needed)
    const amount = 5000; // Example fixed amount

    // Prepare payment data for SSLCommerz
    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${API_BASE_URL}/payment/success/${transactionId}`,
      fail_url: `${API_BASE_URL}/payment/fail/${transactionId}`,
      cancel_url: `${API_BASE_URL}/payment/cancel/${transactionId}`,
      product_name: "Property Payment",
      cus_name: req.user?.fullName || "Customer", // Use authenticated user's name
      cus_email: req.user?.email || "customer@example.com", // Use authenticated user's email
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: req.user?.phoneNumber || "01711111111", // Use authenticated user's phone
    };

    // Initialize SSLCommerz payment
    const sslcz = new SSLCommerzPayment(SSL_STORE_ID, SSL_STORE_PASSWORD, SSL_IS_SANDBOX);
    sslcz
      .init(data)
      .then(async (apiResponse) => {
        const gatewayPageURL = apiResponse.GatewayPageURL;
         console.log("SSLCommerz API Response:", apiResponse); // Log the API response
        // Create a payment record in the database
        await Payment.create({
          transactionId,
          addListId: listId,
          amount,
          paymentMethod: "SSLCommerz",
          status: "pending",
        });

        // Log payment initiation
        console.log(`Payment initiated for transaction ID: ${transactionId}`);

        return res.status(200).json({ paymentUrl: gatewayPageURL });
      })
      .catch((error) => {
        console.error("SSL Payment Error:", error);
        return res.status(500).json({ message: "Payment initiation failed" });
      });
  } catch (error) {
    console.error("Payment Error:", error);
    return res.status(500).json({ message: "Failed to initiate payment" });
  }
};

/**
 * Handle Successful Payment
 */
export const successPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Update payment status to "completed"
    const payment = await Payment.findOneAndUpdate(
      { transactionId },
      { status: "completed" },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Log successful payment
    console.log(`Payment completed for transaction ID: ${transactionId}`);

    // Redirect to the frontend success page
    return res.redirect(`${ALLOWED_ORIGIN}/payment-success`);
  } catch (error) {
    console.error("Payment Success Error:", error);
    return res.status(500).json({ message: "Failed to update payment status" });
  }
};

/**
 * Handle Failed Payment
 */
export const failPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Update payment status to "failed"
    await Payment.findOneAndUpdate(
      { transactionId },
      { status: "failed" }
    );

    // Log failed payment
    console.log(`Payment failed for transaction ID: ${transactionId}`);

    // Redirect to the frontend failure page
    return res.redirect(`${ALLOWED_ORIGIN}/payment-fail`);
  } catch (error) {
    console.error("Payment Fail Error:", error);
    return res.status(500).json({ message: "Failed to update payment status" });
  }
};

/**
 * Handle Cancelled Payment
 */
export const cancelPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Update payment status to "cancelled"
    await Payment.findOneAndUpdate(
      { transactionId },
      { status: "cancelled" }
    );

    // Log cancelled payment
    console.log(`Payment cancelled for transaction ID: ${transactionId}`);

    // Redirect to the frontend cancellation page
    return res.redirect(`${ALLOWED_ORIGIN}/payment-cancel`);
  } catch (error) {
    console.error("Payment Cancel Error:", error);
    return res.status(500).json({ message: "Failed to update payment status" });
  }
};