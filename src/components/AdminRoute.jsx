// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // Read user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // If user exists and role is admin, render children, else redirect to home
  if (user && user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute;
