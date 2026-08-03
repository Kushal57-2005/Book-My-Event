import crypto from "crypto";

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const isOTPExpired = (expiry) => {
  return new Date() > expiry;
};

export const getOTPExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000); //10 minutes
};
