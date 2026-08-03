import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "7d",
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "30d",
  ALLOWED_ORIGINS: process.env.CLIENT_URLS
    ? process.env.CLIENT_URLS.split(",").map((url) => url.trim()).filter(Boolean)
    : ["http://localhost:5173", "http://localhost:5174"],
};
