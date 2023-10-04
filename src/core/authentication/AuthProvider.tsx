import React, { createContext, useContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);

  const login = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_MAILLARD_API_BASE_URI}/auth/google/login`,
      { credentials: "include" }
    );
    const data = await response.json();
    window.location.href = data.url;
  };

  const logout = async () => {
    await fetch(
      `${process.env.REACT_APP_MAILLARD_API_BASE_URI}/auth/google/logout`
    );
  };

  return (
    <AuthContext.Provider
      value={{ adminIsLoggedIn, setAdminIsLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

interface AuthContextType {
  adminIsLoggedIn: boolean;
  setAdminIsLoggedIn: (isadminIsLoggedIn: boolean) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
