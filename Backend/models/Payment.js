import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true, // Ensure unique transactions
  },
  addListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddList", // Reference to AddList schema
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Invalid amount"],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["SSLCommerz", "Bkash", "Nagad", "Cash"],
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
