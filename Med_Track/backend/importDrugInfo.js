import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import DrugInfo from "./models/DrugInfo.js";

dotenv.config();

const data = JSON.parse(fs.readFileSync("./data/druginfo.json", "utf-8"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected Successfully");

    await DrugInfo.deleteMany();
    console.log("Cleared old drug info data");

    await DrugInfo.insertMany(data);
    console.log(`Imported ${data.length} drug references successfully!`);

    process.exit();
  })
  .catch((error) => {
    console.log("Error:", error);
    process.exit(1);
  });
