import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  forgetPassword,
  verifyResetPasswordOTP,
  resetPassword,
} from "../../api/auth";
import Card3D from "../common/Card3D";
import Navbar from "../layout/Navbar";

export default function ForgotPassword() {
  const navigate = useNavigate();

  // Step 1: Request OTP | Step 2: Verify OTP | Step 3: Set New Password
  const [step, setStep] = useState(1);

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [demoOtp, setDemoOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Step 1: Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setError("Please enter your registered email or phone number");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await forgetPassword(emailOrPhone);
      if (res.data?.data?.otp) {
        setDemoOtp(res.data.data.otp);
      }
      setMessage(res.data?.message || "OTP sent to your registered contact!");
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send recovery OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await verifyResetPasswordOTP(emailOrPhone, otp);
      setMessage(res.data?.message || "OTP verified successfully!");
      setStep(3);
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid or expired OTP. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await resetPassword(emailOrPhone, newPassword);
      setMessage(
        res.data?.message ||
          "Password updated successfully! Redirecting to login...",
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update password. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9] px-4 pt-24 pb-16">
        <div className="w-full max-w-md">
          <Card3D className="w-full">
            <div className="bg-white rounded-3xl shadow-md border border-stone-200/80 p-8 sm:p-10">
              <div className="text-center mb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-amber-400 shadow-md">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                  {step === 1 && "Forgot Password"}
                  {step === 2 && "Verify Recovery OTP"}
                  {step === 3 && "Reset New Password"}
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  {step === 1 &&
                    "Enter your registered email or phone number to receive an OTP"}
                  {step === 2 && (
                    <>
                      Enter the code sent to{" "}
                      <span className="font-bold text-stone-800">
                        {emailOrPhone}
                      </span>
                    </>
                  )}
                  {step === 3 && "Create a new strong password for your account"}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= 1 ? "w-8 bg-amber-400" : "w-4 bg-stone-200"
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= 2 ? "w-8 bg-amber-400" : "w-4 bg-stone-200"
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= 3 ? "w-8 bg-amber-400" : "w-4 bg-stone-200"
                  }`}
                />
              </div>

              {step === 2 && demoOtp && (
                <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold text-center flex flex-col items-center gap-1 shadow-sm">
                  <span className="text-[10px] uppercase tracking-wider text-amber-700 font-extrabold">Demo Recovery OTP</span>
                  <span className="text-2xl font-mono tracking-[0.3em] text-amber-600 font-black">{demoOtp}</span>
                </div>
              )}

              {message && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center">
                  {message}
                </div>
              )}

              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold text-center">
                  {error}
                </div>
              )}

              {/* STEP 1: Email or Phone */}
              {step === 1 && (
                <form onSubmit={handleRequestOTP} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Email or Phone Number
                    </label>
                    <input
                      type="text"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="john@example.com or 9876543210"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all duration-300"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-stone-900 border border-stone-800 hover:bg-stone-800 shadow-md transition-all duration-300 active:scale-[0.97] disabled:opacity-50"
                  >
                    {loading ? "Sending OTP..." : "Send Recovery OTP"}
                  </button>
                </form>
              )}

              {/* STEP 2: Verification Code */}
              {step === 2 && (
                <form onSubmit={handleVerifyOTP} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      6-Digit Recovery OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                      className="w-full text-center tracking-[0.5em] text-lg font-mono px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setError("");
                        setMessage("");
                      }}
                      className="flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 border border-stone-200 hover:bg-stone-200 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-[2] py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-stone-900 border border-stone-800 hover:bg-stone-800 shadow-md transition-all duration-300 active:scale-[0.97] disabled:opacity-50"
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: New Password */}
              {step === 3 && (
                <form
                  onSubmit={handleResetPassword}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 rounded-xl border bg-stone-50 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        confirmPassword.length > 0 &&
                        newPassword !== confirmPassword
                          ? "border-rose-400 focus:ring-rose-500/30"
                          : "border-stone-200 focus:ring-amber-400/30 focus:border-amber-400"
                      }`}
                      required
                    />
                    {confirmPassword.length > 0 &&
                      newPassword !== confirmPassword && (
                        <p className="text-rose-600 text-xs font-bold mt-1">
                          Passwords do not match!
                        </p>
                      )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-stone-900 border border-stone-800 hover:bg-stone-800 shadow-md transition-all duration-300 active:scale-[0.97] disabled:opacity-50 mt-2"
                  >
                    {loading ? "Updating..." : "Reset Password"}
                  </button>
                </form>
              )}

              <div className="flex flex-col gap-2 text-center text-xs text-stone-500 mt-6 pt-4 border-t border-stone-100">
                <p>
                  Remembered your password?{" "}
                  <Link
                    to="/login"
                    className="text-stone-900 font-bold hover:text-amber-600 transition-colors"
                  >
                    Back to Sign In
                  </Link>
                </p>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </>
  );
}
