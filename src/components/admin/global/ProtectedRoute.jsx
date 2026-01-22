import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    //  No token → redirect to login page
    return <Navigate to="/" replace />;
  }

  // ✅ Token exists → allow access
  return children;
};

export default ProtectedRoute;
