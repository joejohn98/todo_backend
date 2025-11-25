import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDB_URI = process.env.DATABASE_URI;

const connectDB = async () => {
  if (!MongoDB_URI) {
    console.error("DATABASE_URI is not defined in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(MongoDB_URI);
    console.log("✅ Connected to MongoDB database");
  } catch (error) {
    console.log("❌ Failed to connect to MongoDB database", error);
  }
};

export default connectDB;