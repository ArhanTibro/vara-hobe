// models/AddList.js
import mongoose from 'mongoose';

const AddListSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3 },
  type: { type: String, enum: ['Residential', 'Office', 'Warehouse'], required: true },
  roomCount: {
    bedroom: { type: Number, required: true, min: 0 },
    washroom: { type: Number, required: true, min: 0 },
    balcony: { type: Number, required: true, min: 0 }
  },
  description: { type: String, required: true, trim: true, minlength: 10 },
  location: { type: String, required: true, trim: true },
  image: { type: String, required: true },  // Store file path instead of Base64
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const AddList = mongoose.model('AddList', AddListSchema);
export default AddList;
