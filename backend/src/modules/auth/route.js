import { Router } from "express";
import {
  registerController,
  verifyPhoneOTP,
  loginController,
  logOutController,
  getMe,
  forgetPassword,
  verifyForgetPassword,
  resetPassword,
  resendOTP,
  changePassword,
} from "./controller.js";
import authProvider from "../../middleware/middleware.js";

const router = Router();

router.post("/register", registerController);
router.post("/verifyOTP", verifyPhoneOTP);
router.post("/login", loginController);
router.post("/logout", authProvider, logOutController);
router.get("/getme", authProvider, getMe);
router.post("/forget-password", forgetPassword);
router.post("/verify-forget-password", verifyForgetPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-OTP", authProvider, resendOTP);
router.post("/change-password", authProvider, changePassword);
export default router;
