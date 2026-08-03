import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Watchlist from "./components/pages/Watchlist";
import Trending from "./components/pages/Trending";
import MyBookings from "./components/pages/MyBookings";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ProtectedRoute, { AdminRoute } from "./components/ProtectedRoutes";
import EmailVerification from "./components/pages/EmailVerification";
import ForgotPassword from "./components/pages/ForgetPassword";
import ResetPassword from "./components/pages/ResetPassword";
import OTPVerification from "./components/pages/OTPVerification";
import AdminPage from "./components/pages/AdminPage";

function App() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />
        <Route path="/trending" element={<Trending />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}
export default App;
