import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Equipment from "./pages/Equipment";
import Register from "./pages/Registration";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/admin/AdminPanel";
import { CartProvider } from "./context/CartContext";
import Receipt from "./pages/Receipt";
import AdminRoute from "./components/AdminRoute";
import RatingReview from "./pages/RatingReview";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageUsers from "./pages/admin/ManageUsers";
import ManagePayments from "./pages/admin/ManagePayments";
import ProtectedRoute from "./components/ProtectedRoute";
import Product from "./pages/Product";
import Bookmark from "./pages/Bookmark";
import Review from "./pages/Review";
import Complaint from "./pages/Complaint";
import Order from "./pages/Order";

import { Toaster } from "react-hot-toast";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} >
            <Route path="/profile/" element={<Bookmark />} />
            <Route path="bookmarks" element={<Bookmark />} />
            <Route path="reviews" element={<Review />} />
            <Route path="orders" element={<Order />} />
            <Route path="complaints" element={<Complaint />} />
          </Route>
          <Route path="/services" element={<Services />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/ratingreview" element={<RatingReview />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/bookmark/:id" element={<Bookmark />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          >
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="manage-orders" element={<ManageOrders />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-payments" element={<ManagePayments />} />
          </Route>
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
};

export default App;
