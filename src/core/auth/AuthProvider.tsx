import { googleLogout } from "@react-oauth/google";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Maybe } from "../utils/types";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [bearerToken, setBearerToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshToken(setBearerToken, () => setLoading(false));
  }, []);

  const logout = () => {
    setBearerToken(undefined);
    googleLogout();
  };

  const getTokens = async (code: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_MAILLARD_API_BASE_URI}/auth/gettokens`,
      {
        method: "POST",
        body: JSON.stringify({ code }),
        credentials: "include",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        }),
      }
    );

    const responseJson: Maybe<{
      accessToken: Maybe<string>;
    }> = await response.json();

    if (responseJson && responseJson?.accessToken) {
      setBearerToken(responseJson.accessToken);
      return true;
    }

    return false;
  };

  return (
    <AuthContext.Provider value={{ bearerToken, logout, getTokens, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

interface AuthContextType {
  bearerToken: string | undefined;
  logout: () => void;
  getTokens: (idToken: string) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

async function refreshToken(
  onSuccess: (accessToken: string) => void,
  onFinal: () => void
) {
  const response = await fetch(
    `${process.env.REACT_APP_MAILLARD_API_BASE_URI}/auth/refreshtoken`,
    {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      }),
    }
  );

  const responseJson: Maybe<{
    accessToken: Maybe<string>;
  }> = await response.json();

  if (responseJson && responseJson?.accessToken) {
    onSuccess(responseJson.accessToken);
    onFinal();
  }
  onFinal();
}
