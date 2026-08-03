import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Navbar from "../layout/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/auth";
import Card3D from "../common/Card3D";

export default function Register() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }
    try {
      const res = await registerUser(form);
      const user = res.data.data;
      localStorage.setItem("phone", form.phone);
      navigate("/verify-otp", { state: { phone: form.phone, demoOtp: user.otp } });
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const mismatch =
    confirmPassword.length > 0 && form.password !== confirmPassword;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9] px-4 pt-24 pb-16">
        <div className="w-full max-w-md">
          <Card3D className="w-full">
            <div className="bg-white rounded-3xl shadow-md border border-stone-200/80 px-8 py-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-3 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-amber-400 shadow-md">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                  Create Account
                </h2>
                <p className="text-stone-500 text-xs mt-1">
                  Join BookMyEvent pass platform
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Kushal Waykole"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+911234567890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPwd ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 pr-11 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 transition-colors"
                    >
                      {showPwd ? (
                        <EyeSlashIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPwd ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full px-3.5 py-2.5 pr-11 rounded-xl border bg-stone-50 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        mismatch
                          ? "border-rose-400 focus:ring-rose-500/30 focus:border-rose-400"
                          : "border-stone-200 focus:ring-amber-400/30 focus:border-amber-400"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 transition-colors"
                    >
                      {showConfirmPwd ? (
                        <EyeSlashIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {mismatch && (
                    <p className="text-rose-600 text-xs font-bold mt-1">
                      Passwords do not match!
                    </p>
                  )}
                </div>

                {error && (
                  <p className="text-rose-600 text-xs font-bold text-center bg-rose-50 border border-rose-200 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-stone-900 border border-stone-800 hover:bg-stone-800 shadow-md transition-all duration-300 active:scale-[0.97]"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </form>

              <p className="text-center text-xs text-stone-500 mt-5 pt-3 border-t border-stone-100">
                Already registered?{" "}
                <Link
                  className="text-stone-900 font-bold hover:text-amber-600 transition-colors"
                  to="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Card3D>
        </div>
      </div>
    </>
  );
}
