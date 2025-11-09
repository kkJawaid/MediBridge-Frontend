// src/pages/Receipt.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items = [], total = 0 } = location.state || {};

  useEffect(() => {
    if (!location.state || !location.state.items) {
      navigate("/cart"); // Redirect if accessed directly
    }
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        <section className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 max-w-md sm:max-w-lg md:max-w-2xl w-full border border-purple-100">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#A36DBD] text-center mb-2 sm:mb-4">
            Payment Successful 🎉
          </h1>
          <p className="text-[#A36DBD] text-center mb-6 sm:mb-8">
            Thank you for your purchase! Here’s your receipt.
          </p>

          {items.length > 0 ? (
            <div className="divide-y divide-purple-100 mb-6">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 text-[#4B1D65]"
                >
                  <span className="font-medium text-sm sm:text-base">
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="font-semibold text-sm sm:text-base mt-1 sm:mt-0">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mb-6">
              No items found in your order.
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center text-lg font-semibold text-[#6B1FA1] border-t border-purple-100 pt-4 mb-6">
            <span>Total Paid:</span>
            <span className="mt-2 sm:mt-0">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-[#A36DBD] to-[#9258ad] text-white py-3 rounded-2xl hover:from-[#9258ad] hover:to-[#7d4699] active:scale-95 transition-all shadow-lg"
          >
            Back to Home
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Receipt;
