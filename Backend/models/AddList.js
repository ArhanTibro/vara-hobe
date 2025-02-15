// models/AddList.js
import mongoose from 'mongoose';

const AddListSchema = new mongoose.Schema({
  title: { type: String, required: [true, "No title"], trim: true, minlength: [3, "Too short"] },
  type: { type: String, enum: ['Residential', 'Office', 'Warehouse'], required: true },
  roomCount: {
    bedroom: { type: Number, required: true, min: [0, "Invalid number"] },
    washroom: { type: Number, required: true, min: [0, "Invalid number"] },
    balcony: { type: Number, required: true, min: [0, "Invalid number"] }
  },
  size: {type: Number, required: true, min: [100, "Size cannot be less than 100"]},
  description: { type: String, required: true, trim: true, minlength: [50, "Too short"], maxlength: [5000, "Too long"] },
  location: { type: String, required: true, trim: true },
  image: { type: String, required: true },  // Store file path instead of Base64
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const AddList = mongoose.model('AddList', AddListSchema);
export default AddList;
