import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireRole({
  role,
  children,
}: {
  role: "student" | "company";
  children: ReactNode;
}) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.isLoggedIn || auth.role !== role) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
