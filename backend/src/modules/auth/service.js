import { ApiError } from "../../utils/api-error.js";
import User from "./model.js";
import { generateOTP, getOTPExpiry, isOTPExpired } from "./utils/otp.js";
import { isOtpExpires } from "./utils/otpExpiry.js";
import bcrypt from "bcrypt";

export const verifyPhoneOTPService = async (phone, otp) => {
  const user = await User.findOne({ phone }).select("+otp +OtpExpires");
  if (!user) throw new ApiError(404, "User not found with this phone number");

  if (!user.OtpExpires || isOtpExpires(user.OtpExpires)) {
    throw new ApiError(400, "OTP has expired. Generate a new one.");
  }

  if (otp !== user.otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  user.isPhoneVerified = true;
  user.otp = undefined;
  user.OtpExpires = undefined;
  await user.save();

  return user;
};

export const registerService = async (fullName, email, phone, password) => {
  const existedUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existedUser)
    throw new ApiError(400, "User already exists with this email or phone");

  const otp = generateOTP();
  const OtpExpires = getOTPExpiry();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    phone,
    password: hashedPassword,
    role: "user",
    otp,
    OtpExpires,
  });

  const userData = user.toObject();
  userData.otp = otp;

  return userData;
};

export const loginService = async (emailOrPhone, password) => {
  const user = await User.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  }).select("+password +isPhoneVerified +role");

  if (!user) throw new ApiError(404, "User Not Found");
  if (user.role !== "admin" && !user.isPhoneVerified)
    throw new ApiError(400, "Phone number is not verified");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ApiError(400, "Invalid Password");

  return user;
};

export const logOutService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  user.refreshToken = null;
  await user.save();

  return { message: "Logout successfully" };
};

export const forgetPasswordService = async (emailOrPhone) => {
  const user = await User.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  });
  if (!user)
    throw new ApiError(404, "User not found with this email or phone number");

  const phoneOTP = generateOTP();
  const phoneOTPExpiry = getOTPExpiry();

  user.otp = phoneOTP;
  user.OtpExpires = phoneOTPExpiry;

  await user.save();

  return { message: "OTP has been sent for password reset", otp: phoneOTP };
};

export const verifyForgotPasswordOTPService = async (emailOrPhone, otp) => {
  const user = await User.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  }).select("+otp +OtpExpires");
  if (!user) throw new ApiError(404, "User not found");

  if (!user.OtpExpires || isOTPExpired(user.OtpExpires))
    throw new ApiError(400, "OTP is expired. Please generate a new one.");

  if (user.otp !== otp) {
    throw new ApiError(401, "Invalid OTP");
  }
  user.isForgotPasswordOTPVerified = true;
  await user.save();
  return { message: "OTP is verified" };
};

export const resetPasswordService = async (emailOrPhone, newPassword) => {
  const user = await User.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  }).select("+password");
  if (!user) throw new ApiError(404, "User not found");
  if (!user.isForgotPasswordOTPVerified) {
    throw new ApiError(
      401,
      "OTP verification required before resetting password",
    );
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password);

  if (isSamePassword) {
    throw new ApiError(400, "New password cannot be the same as old password.");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = undefined;
  user.OtpExpires = undefined;
  user.isForgotPasswordOTPVerified = false;
  await user.save();

  return { message: "Password updated successfully" };
};

export const resendOTPService = async (userId) => {
  const user = await User.findById(userId).select("+OtpExpires");
  if (!user) throw new ApiError(404, "User not found");

  if (user.OtpExpires && !isOTPExpired(user.OtpExpires))
    throw new ApiError(400, "Current OTP is not expired yet. Please wait!");

  const phoneOTP = generateOTP();
  const phoneOTPExpiry = getOTPExpiry();

  user.otp = phoneOTP;
  user.OtpExpires = phoneOTPExpiry;
  await user.save();

  return { message: "New OTP has been sent successfully", otp: phoneOTP };
};

export const changePasswordService = async (
  userId,
  newPassword,
  oldPassword,
) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) throw new ApiError(400, "Invalid current password");

  if (newPassword === oldPassword)
    throw new ApiError(
      400,
      "New password must be different from current password",
    );

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password updated successfully" };
};
