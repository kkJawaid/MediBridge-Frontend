import React from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    toast.error("Please log in to continue.");
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
