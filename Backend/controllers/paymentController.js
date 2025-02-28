import { sslcommerz } from "../config/sslcommerz.js";
import List from "../models/AddList.js";

export const initiatePayment = async (req, res) => {
  const { listingId } = req.body;
  const listing = await List.findById(listingId);

  if (!listing) return res.status(404).json({ message: "Listing not found" });

  const data = {
    total_amount: listing.size * 1000, // Example pricing logic
    currency: "BDT",
    tran_id: `txn_${Date.now()}`,
    success_url: process.env.SSLCOMMERZ_SUCCESS_URL,
    fail_url: process.env.SSLCOMMERZ_FAIL_URL,
    cancel_url: process.env.SSLCOMMERZ_CANCEL_URL,
    cus_name: "Customer",
    cus_email: "customer@example.com",
    cus_phone: "01700000000",
    product_name: listing.title,
    product_category: "Real Estate",
  };

  try {
    const response = await sslcommerz.init(data);
    res.status(200).json({ paymentUrl: response.GatewayPageURL });
  } catch (error) {
    console.error("SSLCommerz Error:", error);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};
