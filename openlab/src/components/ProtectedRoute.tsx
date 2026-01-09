import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactElement;
  role?: "lab" | "user";
}) {
  const { auth } = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.role !== role) {
    // unauthorized
    return <Navigate to="/" replace />;
  }

  return children;
}
