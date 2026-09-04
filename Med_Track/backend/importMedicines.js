import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Medicine from "./models/Medicine.js";

dotenv.config();

const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected Successfully");

    await Medicine.deleteMany();

    await Medicine.insertMany(data);

    console.log("Medicines imported successfully!");

    process.exit();
  })
  .catch((error) => {
    console.log("Error:", error);
    process.exit(1);
  });
