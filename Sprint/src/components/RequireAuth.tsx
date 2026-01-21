import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.isLoggedIn) {
    const nextPath = `${location.pathname}${location.search}`;
    return <Navigate to="/login" replace state={{ from: nextPath }} />;
  }

  return <>{children}</>;
}
