import mongoose from "mongoose";

const AddListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "No title"],
      trim: true,
      minlength: [3, "Too short"],
    },
    type: {
      type: String,
      enum: ["Residential", "Office", "Warehouse"],
      required: true,
    },
    roomCount: {
      bedroom: { type: Number, required: true, min: [0, "Invalid number"] },
      washroom: { type: Number, required: true, min: [0, "Invalid number"] },
      balcony: { type: Number, required: true, min: [0, "Invalid number"] },
    },
    size: { type: Number, required: true },
    rent: { type: Number, required: true }, // New rent field added
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Too short"],
      maxlength: [5000, "Too long"],
    },
    location: { type: String, required: true, trim: true },
    area: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    image: { type: [String], required: true }, // Store file path instead of Base64
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: { type: Number, default: 0 },
    occupied: { type: Boolean, default: false },
    access: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, // New access field added
  },
  { timestamps: true }
);

const AddList = mongoose.model("AddList", AddListSchema);
export default AddList;
