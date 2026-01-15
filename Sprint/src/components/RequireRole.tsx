import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireRole({
  role,
  children,
}: {
  role: "student" | "company";
  children: ReactNode;
}) {
  const { auth } = useAuth();

  if (!auth.isLoggedIn || auth.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
