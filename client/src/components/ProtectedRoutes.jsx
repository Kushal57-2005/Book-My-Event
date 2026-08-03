import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card3D from "./common/Card3D";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9] text-stone-500 font-medium">
        Loading...
      </div>
    );

  if (!user) {
    return (
      <>
        {/* Render children in background, but prevent interaction, scrolling, and hide Navbar */}
        <div className="pointer-events-none select-none h-screen overflow-hidden [&_nav]:hidden">
          {children}
        </div>

        {/* Blur Overlay & Modal */}
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
          <div className="max-w-md w-full">
            <Card3D className="w-full">
              <div className="text-center bg-white shadow-2xl rounded-3xl p-8 border border-stone-200">
                {/* Icon */}
                <div className="w-16 h-16 bg-stone-900 border border-stone-800 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                  <svg
                    className="w-8 h-8"
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

                {/* Heading */}
                <h2 className="text-2xl font-black text-stone-900 mb-2">
                  Authentication Required
                </h2>

                {/* Description */}
                <p className="text-stone-500 text-xs sm:text-sm mb-6 leading-relaxed">
                  You need to sign in or create an account to view this section and manage event passes.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link to="/login" className="flex-1 pointer-events-auto">
                    <button className="w-full px-5 py-3 rounded-xl bg-stone-900 border border-stone-800 text-amber-300 text-xs font-extrabold uppercase tracking-wider hover:bg-stone-800 shadow-md transition-all">
                      Sign In
                    </button>
                  </Link>

                  <Link to="/register" className="flex-1 pointer-events-auto">
                    <button className="w-full px-5 py-3 rounded-xl border border-stone-300 text-stone-900 text-xs font-bold hover:bg-stone-100 transition-all">
                      Register
                    </button>
                  </Link>
                </div>

                {/* Go Back */}
                <div className="mt-6 pointer-events-auto">
                  <button
                    onClick={() => navigate(-1)}
                    className="text-xs font-bold text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    Return to previous page
                  </button>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </>
    );
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9] text-stone-500 font-medium">
        Loading...
      </div>
    );

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9] px-4">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 border border-stone-200 shadow-xl">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl">
            🚫
          </div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Access Denied</h2>
          <p className="text-stone-500 text-xs sm:text-sm mb-6">
            You must be logged in as an Administrator to access the Admin Panel.
          </p>
          <div className="flex gap-3">
            <Link to="/login" className="flex-1">
              <button className="w-full py-3 rounded-xl bg-stone-900 text-amber-400 font-extrabold text-xs uppercase">
                Login as Admin
              </button>
            </Link>
            <Link to="/" className="flex-1">
              <button className="w-full py-3 rounded-xl border border-stone-300 text-stone-900 font-bold text-xs">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
