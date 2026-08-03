import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${env.MONGODB_URI}`);
    console.log("MongoDB is Successfully connect to the server ✅");
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR ❌", error);
  }
};
