import Payment from "../models/Payment.js";
import SSLCommerzPayment from "sslcommerz-lts";
import dotenv from "dotenv";
import { Types } from "mongoose";
import AddList from "../models/AddList.js";

dotenv.config();

const SSL_IS_SANDBOX = process.env.SSL_IS_SANDBOX === "true";
const SSL_STORE_ID = process.env.SSL_STORE_ID;
const SSL_STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
const API_BASE_URL = process.env.API_BASE_URL;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

// Generate SSL Payment URL
export const generateSslPayment = async (req, res) => {
  try {
    const { listId } = req.params;
    const amount = 5000; // Fixed amount

    const addList = await AddList.findById(listId);
    if (!addList) {
      return res.status(404).json({ message: "Property listing not found" });
    }

    const transactionId = new Types.ObjectId().toString();

    const payment = await Payment.create({
      transactionId,
      addListId: listId,
      amount,
      paymentMethod: "SSLCommerz",
      status: "pending",
    });

    const sslcz = new SSLCommerzPayment(SSL_STORE_ID, SSL_STORE_PASSWORD, SSL_IS_SANDBOX);

    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${API_BASE_URL}/payment/success/${transactionId}`,
      fail_url: `${API_BASE_URL}/payment/fail/${transactionId}`,
      cancel_url: `${API_BASE_URL}/payment/cancel/${transactionId}`,
      product_name: "Property Payment",
      cus_name: "Customer",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
    };

    const apiResponse = await sslcz.init(data);

    return res.status(200).json({ paymentUrl: apiResponse.GatewayPageURL });
  } catch (error) {
    console.error("SSL Payment Error:", error);
    return res.status(500).json({ message: "Failed to initiate payment" });
  }
};

// Handle Successful Payment
export const successPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const payment = await Payment.findOneAndUpdate(
      { transactionId },
      { status: "completed" },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.redirect(`${ALLOWED_ORIGIN}/payment-success`);
  } catch (error) {
    console.error("Payment Success Error:", error);
    return res.status(500).json({ message: "Failed to update payment status" });
  }
};

// Handle Failed Payment
export const failPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    await Payment.findOneAndUpdate(
      { transactionId },
      { status: "failed" }
    );

    return res.redirect(`${ALLOWED_ORIGIN}/payment-fail`);
  } catch (error) {
    console.error("Payment Fail Error:", error);
    return res.status(500).json({ message: "Failed to update payment status" });
  }
};

// Handle Cancelled Payment
export const cancelPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    await Payment.findOneAndUpdate(
      { transactionId },
      { status: "cancelled" }
    );

    return res.redirect(`${ALLOWED_ORIGIN}/payment-cancel`);
  } catch (error) {
    console.error("Payment Cancel Error:", error);
    return res.status(500).json({ message: "Failed to update payment status" });
  }
};
