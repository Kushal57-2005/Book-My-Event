import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import Card3D from "../common/Card3D";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Failed to reset password. Link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9] px-4 py-16">
      <div className="w-full max-w-md">
        <Card3D className="w-full">
          <div className="bg-white rounded-3xl shadow-md border border-stone-200/80 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-amber-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.667 0-8 1.333-8 4v2h16v-2c0-2.667-5.333-4-8-4z" />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-black text-stone-900 mb-1">Reset Password</h2>
            <p className="text-stone-500 text-xs sm:text-sm mb-6">
              Set a new secure password for your account.
            </p>

            {!token && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl py-3 px-4 mb-4">
                Invalid or expired reset token. Please request a new link.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="New password"
                className="w-full px-4 py-3 border border-stone-200 bg-stone-50 text-xs text-stone-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Confirm new password"
                className={`w-full px-4 py-3 border rounded-xl bg-stone-50 text-xs text-stone-900 focus:outline-none focus:ring-2 transition-all ${
                  confirmPassword.length > 0 && password !== confirmPassword
                    ? "border-rose-400 focus:ring-rose-500/30"
                    : "border-stone-200 focus:ring-amber-400/30 focus:border-amber-400"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="text-rose-600 text-xs font-bold text-left">
                  Passwords do not match!
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full py-3.5 bg-stone-900 border border-stone-800 text-amber-300 text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-stone-800 disabled:opacity-60 transition-all shadow-md active:scale-95"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>

            {message && (
              <p className="text-xs font-bold text-emerald-600 mt-4 bg-emerald-50 py-2 rounded-lg">{message}</p>
            )}
            {error && (
              <p className="text-xs font-bold text-rose-600 mt-4 bg-rose-50 py-2 rounded-lg">{error}</p>
            )}

            <div className="mt-6 pt-4 border-t border-stone-100">
              <Link
                to="/login"
                className="text-stone-900 text-xs font-bold hover:text-amber-600 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
}
