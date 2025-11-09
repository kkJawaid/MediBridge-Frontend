// src/main.jsx or src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext"; // 
import "./index.css"; //
export { default as AdminLayout } from "./pages/admin/AdminLayout";
export { default as AdminPanel } from "./pages/admin/AdminPanel";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>  
      <App />
    </CartProvider>
  </React.StrictMode>
);
