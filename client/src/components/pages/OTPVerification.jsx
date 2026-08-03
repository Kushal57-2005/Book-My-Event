import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Card3D from "../common/Card3D";
import { verifyOTP, resendOTP } from "../../api/auth";

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve phone from navigation state or localStorage fallback
  const phone = location.state?.phone || localStorage.getItem("phone") || "";
  const [displayOtp, setDisplayOtp] = useState(location.state?.demoOtp || "");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!phone) {
      setError("No phone number found for verification. Please register first.");
    }
  }, [phone]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      await verifyOTP({ phone, otp });
      setSuccessMsg("Phone verified successfully! Redirecting to login...");
      localStorage.removeItem("phone");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await resendOTP();
      if (res.data?.data?.otp) {
        setDisplayOtp(res.data.data.otp);
      }
      setSuccessMsg("A new OTP has been sent!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
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
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                  Verify OTP
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  Enter the verification code sent to{" "}
                  <span className="font-bold text-stone-800">{phone || "your phone"}</span>
                </p>
              </div>

              {displayOtp && (
                <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold text-center flex flex-col items-center gap-1 shadow-sm">
                  <span className="text-[10px] uppercase tracking-wider text-amber-700 font-extrabold">Demo Verification OTP</span>
                  <span className="text-2xl font-mono tracking-[0.3em] text-amber-600 font-black">{displayOtp}</span>
                </div>
              )}

              {successMsg && (
                <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center">
                  {successMsg}
                </div>
              )}

              {error && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerify} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Enter Verification Code
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-stone-900 border border-stone-800 hover:bg-stone-800 shadow-md transition-all duration-300 active:scale-[0.97] disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>

              <div className="flex flex-col gap-2 text-center text-xs text-stone-500 mt-6 pt-4 border-t border-stone-100">
                <p>
                  Didn't receive code?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="text-stone-900 font-bold hover:text-amber-600 transition-colors disabled:opacity-50"
                  >
                    {resending ? "Sending..." : "Resend OTP"}
                  </button>
                </p>
                <p className="mt-1">
                  Back to{" "}
                  <Link
                    to="/register"
                    className="text-stone-900 font-bold hover:text-amber-600 transition-colors"
                  >
                    Register
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
