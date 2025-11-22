import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems = [],
    setCartItems,
    removeFromCart,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/viewCart`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!res.ok) throw new Error("failed to fetch cart");

        const data = await res.json();
        setCartItems(data.products);
        setTotalPrice(data.totalPrice);
      } catch(err) {
        console.log("error: ", err);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = () => {
    navigate("/checkout");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#A36DBD] mb-8 text-center">
          Your Cart
        </h1>

        {!cartItems.length ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <p className="text-gray-500 text-lg">
              Your cart is currently empty.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.type}`}
                  className="flex justify-between items-center border-b last:border-none pb-4 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="font-semibold text-[#A36DBD]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm text-gray-500">{item.type}</p>
                      <p className="text-sm text-gray-500">
                        {item.itemType === "service" ? "Service" : "Equipment"}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.product_id, item.type)}
                          disabled={item.quantity <= 1}
                          className={`px-2 py-1 rounded-lg ${
                            item.quantity <= 1
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-purple-100 text-[#A36DBD] hover:bg-purple-200"
                          }`}
                        >
                          –
                        </button>
                        <span className="font-semibold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.product_id, item.type)}
                          className="px-2 py-1 bg-purple-100 text-[#A36DBD] rounded-lg hover:bg-purple-200"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product_id, item.type)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center bg-white rounded-2xl shadow p-6">
              <p className="text-lg font-semibold text-gray-700">
                Total:{" "}
                <span className="text-[#A36DBD]">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </p>

              <button
                onClick={handleCheckout}
                className="bg-[#A36DBD] text-white px-6 py-3 rounded-lg hover:bg-[#914fb0] transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
