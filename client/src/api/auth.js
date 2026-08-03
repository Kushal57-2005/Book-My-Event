import api from "./axiosInstance.js";

export const registerUser = (data) => api.post("/auth/register", data);

export const verifyOTP = (data) => api.post("/auth/verifyOTP", data);

export const loginUser = (data) => api.post("/auth/login", data);

export const logoutUser = () => api.post("/auth/logout");

export const getMe = () => api.get("/auth/getme");

export const resendOTP = (email) => api.post("/auth/resend-email", { email });

export const forgetPassword = (emailOrPhone) =>
  api.post("/auth/forget-password", { emailOrPhone });

export const verifyResetPasswordOTP = (emailOrPhone, otp) =>
  api.post("/auth/verify-forget-password", { emailOrPhone, otp });

export const resetPassword = (emailOrPhone, newPassword) =>
  api.post("/auth/reset-password", { emailOrPhone, newPassword });

export const changePassword = (newPassword, oldPassword) =>
  api.post("/auth/change-password", { newPassword, oldPassword });
