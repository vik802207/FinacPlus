import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null; // SSR safety
    const raw = localStorage.getItem("mock_jwt");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (!user) localStorage.removeItem("mock_jwt");
    else localStorage.setItem("mock_jwt", JSON.stringify(user));
  }, [user]);

  function loginAs(role) {
    const token = {
      token: "fake-jwt-" + Date.now(),
      role,
      username: role === "admin" ? "admin_demo" : "user_demo",
      issuedAt: Date.now(),
    };
    setUser(token);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
