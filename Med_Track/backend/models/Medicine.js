import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: String,
  category: String,
  dosage: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
