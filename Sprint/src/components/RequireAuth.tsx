import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { auth } = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
