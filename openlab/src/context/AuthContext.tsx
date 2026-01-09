import React, { createContext, useContext, useState, useEffect } from "react";

type Role = "user" | "lab";

type User = {
  email: string;
  name?: string;
  labName?: string;
};

type AuthState = {
  isLoggedIn: boolean;
  role: Role | null;
  user: User | null;
};

type AuthContextValue = {
  auth: AuthState;
  login: (role: Role, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const raw = localStorage.getItem("openlab_auth");
      if (raw) return JSON.parse(raw) as AuthState;
    } catch (e) {
      /* ignore */
    }
    return { isLoggedIn: false, role: null, user: null };
  });

  useEffect(() => {
    try {
      localStorage.setItem("openlab_auth", JSON.stringify(auth));
    } catch (e) {
      // ignore
    }
  }, [auth]);

  const login = (role: Role, user: User) => {
    setAuth({ isLoggedIn: true, role, user });
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, role: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
