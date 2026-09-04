import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  dosage: {
    type: String,
    required: true,
  },

  frequency: {
    type: String,
    required: true,
  },

  beforeAfterFood: {
    type: String,
    required: true,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
