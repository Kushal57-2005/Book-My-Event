import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resendOTP } from "../../api/auth";
import Card3D from "../common/Card3D";

export default function EmailVerification() {
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResend = async () => {
    setLoading(true);
    setError("");
    try {
      await resendOTP();
      setResent(true);
    } catch {
      setError("Failed to resend email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9] px-4 py-16">
      <div className="w-full max-w-md">
        <Card3D className="w-full">
          <div className="bg-white rounded-3xl shadow-md border border-stone-200/80 px-8 py-10 text-center">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-5 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-amber-400 shadow-md">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-2">
              Verify Email Address
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mb-6 leading-relaxed">
              We have dispatched a verification link to your registered email
              address.
            </p>

            {/* Success state */}
            {resent && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl py-3 px-4 mb-4">
                Verification email dispatched successfully!
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl py-3 px-4 mb-4">
                {error}
              </div>
            )}

            {/* Steps */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 mb-6 text-left flex flex-col gap-3">
              {[
                "Open your email inbox",
                "Click the verification link",
                "Return to sign in",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-400 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-xs text-stone-700 font-semibold">{step}</p>
                </div>
              ))}
            </div>

            {/* Resend button */}
            <button
              onClick={handleResend}
              disabled={loading || resent}
              className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-stone-900 border border-stone-800 hover:bg-stone-800 transition-all duration-300 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed mb-3 shadow-md"
            >
              {loading
                ? "Sending..."
                : resent
                  ? "Email Dispatched"
                  : "Resend Verification Email"}
            </button>

            {/* Back to login */}
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-xl text-xs font-bold text-stone-700 border border-stone-200 hover:bg-stone-100 transition-all duration-300"
            >
              Back to Login
            </button>
          </div>
        </Card3D>
      </div>
    </div>
  );
}
