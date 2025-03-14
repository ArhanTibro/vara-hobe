import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddList", // Reference to the AddList schema
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "canceled"],
      default: "pending",
    },
    payer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema (who made the payment)
      required: true,
    },
  },
  { timestamps: true } // Enable automatic createdAt and updatedAt timestamps
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;