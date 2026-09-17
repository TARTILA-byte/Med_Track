import mongoose from "mongoose";

const myMedicineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: false,
    },

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

    today: {
      type: String,
      required: false,
    },

    time: {
      type: String,
      required: false,
    },

    startDate: {
      type: String,
      required: false,
    },

    endDate: {
      type: String,
      required: false,
    },

    quantity: {
      type: String,
      required: false,
    },

    foodTiming: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const MyMedicine = mongoose.model("MyMedicine", myMedicineSchema);

export default MyMedicine;
