// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  //message to user when item added
  const showToast = (msg) =>
    toast.success(msg, {
      duration: 2000,
      position: "top-center",
      style: {
        border: "1px solid #A36DBD",
        background: "#fff",
        color: "#4B2A63",
        fontWeight: 500,
        fontSize: "14px",
        padding: "12px 18px",
        borderRadius: "10px",
      },
    });

  const stripe = useStripe();
  const elements = useElements();

  async function redirectToStripe() {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = Number(user?.user_id);
    const res = await fetch("http://localhost:5020/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(getTotalPrice()),
        currency: "usd",
        userId: id
      }),
    });
    const { clientSecret } = await res.json();
    console.log("client secret: ", clientSecret);
    // 2. Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    // 3. Handle result
    if (result.error) {
      console.log("Payment failed:", result.error.message);
      showToast(`Payment failed`);
    }
    else if (result.paymentIntent.status === "succeeded") {
      console.log("Payment succeeded!");
      showToast(`Payment Successful!`);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };


  const { cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' or 'upi'
  const [cardInfo, setCardInfo] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Validate expiry dynamically
  const validateExpiry = (expiry) => {
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10);
    if (month < 1 || month > 12) return false;

    const fullYear = 2000 + year;
    const today = new Date();
    const expiryDate = new Date(fullYear, month - 1, 1);
    return expiryDate >= new Date(today.getFullYear(), today.getMonth(), 1);
  };

  const validate = () => {
    const newErrors = {};

    // Delivery validations
    if (!deliveryInfo.name.trim()) newErrors.name = "Name required";
    if (!/\S+@\S+\.\S+/.test(deliveryInfo.email))
      newErrors.email = "Valid email required";
    if (!/^\d{10}$/.test(deliveryInfo.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!deliveryInfo.address.trim()) newErrors.address = "Address required";
    if (!deliveryInfo.city.trim()) newErrors.city = "City required";
    if (!/^\d{5,6}$/.test(deliveryInfo.postalCode))
      newErrors.postalCode = "Valid postal code required";

    // Card validations if card selected
    if (paymentMethod === "card") {
      if (!cardInfo.name.trim()) newErrors.cardName = "Cardholder name required";
      if (!/^\d{16}$/.test(cardInfo.cardNumber.replace(/\s/g, "")))
        newErrors.cardNumber = "Card number must be 16 digits";
      if (!validateExpiry(cardInfo.expiry))
        newErrors.expiry = "Expiry must be MM/YY and not expired";
      if (!/^\d{3,4}$/.test(cardInfo.cvv)) newErrors.cvv = "CVV must be 3-4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    navigate("/receipt", {
      state: { items: cartItems, total: getTotalPrice() },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Navbar />

      <div className="flex-grow flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-[#0f766e] mb-6">Checkout</h1>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl mb-6 border border-purple-100">
          <h2 className="text-xl font-semibold text-[#0f766e] mb-3">Order Summary</h2>

          {cartItems.length > 0 ? (
            <>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, idx) => (
                  <li key={idx} className="flex justify-between py-2 text-[#0f766e]">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-semibold text-[#0f766e] mt-4">
                Total: ${getTotalPrice().toFixed(2)}
              </div>
            </>
          ) : (
            <p className="text-gray-400">Your cart is empty.</p>
          )}
        </div>

        {/* Delivery & Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl border border-purple-100"
        >
          <h2 className="text-xl font-semibold text-[#0f766e] mb-4">Delivery Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={deliveryInfo.name}
                onChange={handleDeliveryChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={deliveryInfo.email}
                onChange={handleDeliveryChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={deliveryInfo.phone}
                onChange={handleDeliveryChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={deliveryInfo.city}
                onChange={handleDeliveryChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={deliveryInfo.postalCode}
                onChange={handleDeliveryChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>

            <div className="md:col-span-2">
              <input
                type="text"
                name="address"
                placeholder="Full Address"
                value={deliveryInfo.address}
                onChange={handleDeliveryChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* <h2 className="text-xl font-semibold text-[#0f766e] mb-4">Payment Method</h2>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Credit/Debit Card
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              UPI / Other
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Cardholder Name"
                  value={cardInfo.name}
                  onChange={handleCardChange}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
                />
                {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={cardInfo.cardNumber}
                  onChange={handleCardChange}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiry (MM/YY)"
                  value={cardInfo.expiry}
                  onChange={handleCardChange}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
                />
                {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={cardInfo.cvv}
                  onChange={handleCardChange}
                  className= "border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200" />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}

              </div>
            </div>
          )} */}

          {/* {paymentMethod === "upi" && (
          <div className="mb-4">
            <input
              type="text"
              name="upiId"
              placeholder="Enter UPI ID"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-200"
              required
            />
          </div>
        )} */}
          <CardElement></CardElement>
          <button
            type="submit"
            className="bg-teal-600 text-white mt-6 py-3 px-6 rounded-xl hover:bg-teal-700 active:bg-teal-800 transition-all w-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            onClick={() => {
              const ok = window.confirm("Are you sure you want to proceed with the payment?");
              if (ok) redirectToStripe();
            }}
          >
            Confirm & Pay
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
