import mongoose from "mongoose";

const drugInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  indications: {
    type: String,
    required: true,
  },

  mechanism: {
    type: String,
    required: true,
  },

  dosage: {
    type: String,
    required: true,
  },

  sideEffects: {
    type: [String],
    default: [],
  },

  interactions: {
    type: [String],
    default: [],
  },

  warnings: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const DrugInfo = mongoose.model("DrugInfo", drugInfoSchema);

export default DrugInfo;
