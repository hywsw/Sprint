import { createContext, useContext, useMemo, useState } from "react";

type Role = "guest" | "student" | "company";

type AuthState = {
  isLoggedIn: boolean;
  role: Role;
  userId?: string;
  name?: string;
};

type AuthContextValue = {
  auth: AuthState;
  login: (userId: string, password: string, roleHint?: Role) => boolean;
  logout: () => void;
  dummyAccounts: { role: Role; userId: string; password: string; name: string }[];
};

const STORAGE_KEY = "sprint.auth";

const dummyAccounts = [
  { role: "student" as const, userId: "student01", password: "sprint1234", name: "학생 데모" },
  { role: "company" as const, userId: "company01", password: "sprint1234", name: "기업 데모" },
];

const defaultAuth: AuthState = { isLoggedIn: false, role: "guest" };

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultAuth;
    try {
      return JSON.parse(raw) as AuthState;
    } catch {
      return defaultAuth;
    }
  });

  const value = useMemo<AuthContextValue>(() => {
    const login = (userId: string, password: string, roleHint?: Role) => {
      const account = dummyAccounts.find(
        (item) => item.userId === userId && item.password === password
      );
      if (!account) return false;
      if (roleHint && roleHint !== "guest" && account.role !== roleHint) return false;
      const nextAuth: AuthState = {
        isLoggedIn: true,
        role: account.role,
        userId: account.userId,
        name: account.name,
      };
      setAuth(nextAuth);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
      return true;
    };

    const logout = () => {
      setAuth(defaultAuth);
      sessionStorage.removeItem(STORAGE_KEY);
    };

    return { auth, login, logout, dummyAccounts };
  }, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
