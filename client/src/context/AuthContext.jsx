import { createContext, useContext, useState, useEffect } from "react";
import { getMe, logoutUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");

    if (isLogged) {
      getMe()
        .then((res) => setUser(res.data.data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem("isLogged");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("isLogged", "true");
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // ignore API error
    } finally {
      setUser(null);
      localStorage.removeItem("isLogged");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
