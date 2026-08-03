import { asyncHandler } from "../../utils/async-handler.js";
import {
  registerService,
  verifyPhoneOTPService,
  loginService,
  logOutService,
  forgetPasswordService,
  resetPasswordService,
  verifyForgotPasswordOTPService,
  resendOTPService,
  changePasswordService,
} from "./service.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import { generateAccessToken, generateRefreshToken } from "./utils/jwt.js";
import User from "./model.js";

export const verifyPhoneOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    throw new ApiError(400, "Phone number and OTP are required");
  }

  const result = await verifyPhoneOTPService(phone, otp);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Phone verified successfully"));
});

export const registerController = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    throw new ApiError(
      400,
      "All fields (fullName, email, phone, password) are required",
    );
  }

  const result = await registerService(fullName, email, phone, password);

  return res
    .status(201)
    .json(new ApiResponse(201, result, "Registered successfully"));
});

export const loginController = asyncHandler(async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    throw new ApiError(400, "Email/Phone and password are required");
  }

  const user = await loginService(emailOrPhone, password);

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  const userData = user.toObject();
  delete userData.password;
  delete userData.refreshToken;

  userData.accessToken = accessToken;
  userData.refreshToken = refreshToken;

  return res
    .status(200)
    .json(new ApiResponse(200, userData, "Logged in successfully"));
});

export const logOutController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const result = await logOutService(userId);

  return res.status(200).json(new ApiResponse(200, result));
});

export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const result = await User.findById(userId).select(
    "-password -OtpExpires -refreshToken -isForgotPasswordOTPVerified -otp",
  );

  return res.status(200).json(new ApiResponse(200, result));
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { emailOrPhone } = req.body;
  if (!emailOrPhone) {
    throw new ApiError(400, "Email or Phone number is required");
  }
  const result = await forgetPasswordService(emailOrPhone);

  return res.status(200).json(new ApiResponse(200, result));
});

export const verifyForgetPassword = asyncHandler(async (req, res) => {
  const { emailOrPhone, otp } = req.body;

  if (!emailOrPhone || !otp) {
    throw new ApiError(400, "Email/Phone and OTP are required");
  }

  const result = await verifyForgotPasswordOTPService(emailOrPhone, otp);

  return res.status(200).json(new ApiResponse(200, result));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { emailOrPhone, newPassword } = req.body;

  if (!emailOrPhone || !newPassword) {
    throw new ApiError(400, "Email/Phone and new password are required");
  }

  const result = await resetPasswordService(emailOrPhone, newPassword);

  return res.status(200).json(new ApiResponse(200, result));
});

export const resendOTP = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const result = await resendOTPService(userId);

  return res.status(200).json(new ApiResponse(200, result));
});

export const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { newPassword, oldPassword } = req.body;
  const result = await changePasswordService(userId, newPassword, oldPassword);

  return res.status(201).json(new ApiResponse(200, result));
});
