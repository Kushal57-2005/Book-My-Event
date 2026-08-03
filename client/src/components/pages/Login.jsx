import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Navbar from "../layout/Navbar";
import Card3D from "../common/Card3D";

export default function Login() {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      const userData = res.data.data;
      login(userData);
      localStorage.setItem("isLogged", true);
      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem("refreshToken", userData.refreshToken);

      if (userData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message;

      const finalMessage =
        backendMessage || error.message || "Login failed. Please try again.";
      setError(finalMessage);
      console.log("Error details:", finalMessage);
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
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                  Sign In
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  Access your BookMyEvent pass account
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    value={form.emailOrPhone}
                    name="emailOrPhone"
                    onChange={handleChange}
                    placeholder="john999"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPwd ? "text" : "password"}
                      value={form.password}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all duration-300"
                      required
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 transition-colors"
                    >
                      {showPwd ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-rose-600 text-xs font-bold text-center">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-stone-900 border border-stone-800 hover:bg-stone-800 shadow-md transition-all duration-300 active:scale-[0.97]"
                >
                  {loading ? "Authenticating..." : "Sign In"}
                </button>
              </form>

              <div className="flex flex-col gap-2 text-center text-xs text-stone-500 mt-6 pt-4 border-t border-stone-100">
                <p>
                  New to platform?{" "}
                  <Link
                    className="text-stone-900 font-bold hover:text-amber-600 transition-colors"
                    to="/register"
                  >
                    Create Account
                  </Link>
                </p>
                <p>
                  Forgotten credentials?{" "}
                  <Link
                    className="text-stone-900 font-bold hover:text-amber-600 transition-colors"
                    to="/forgot-password"
                  >
                    Reset Password
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
