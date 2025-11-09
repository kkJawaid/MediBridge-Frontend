// src/components/PaymentForm.jsx
import React, { useState } from "react";

const PaymentForm = ({ onPaymentSuccess }) => {
  const [form, setForm] = useState({ name: "", card: "", expiry: "", cvv: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment processed successfully (mock)");
    onPaymentSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow">
      <input name="name" placeholder="Cardholder Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="card" placeholder="Card Number" value={form.card} onChange={handleChange} className="w-full p-2 border rounded" />
      <div className="flex gap-2">
        <input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} className="w-1/2 p-2 border rounded" />
        <input name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} className="w-1/2 p-2 border rounded" />
      </div>
      <button type="submit" className="bg-[#A36DBD] text-white px-4 py-2 rounded-lg w-full hover:bg-[#B896C3]">
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
