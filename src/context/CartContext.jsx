import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
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
      icon: "🛒",
    });

  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (item) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    if (token === undefined) {
      showToast("You must be logged in first.");
      return;
    }
    const res = await fetch(`http://localhost:5020/api/cart/${item.product_id}/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (data == "already in cart!") {
      return data;
    }
    else {
      showToast(`${item.name} added successfully to cart.`);
    }
    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.type === item.type
    );

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id && cartItem.type === item.type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = async (id, type) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const res = await fetch(`http://localhost:5020/api/cart/${id}/deleteItem`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Add to cart failed:", errorData.error);
      return;
    }

    setCartItems((prev) =>
      prev.filter((item) => !(item.product_id === id && item.type === type))
    );
  };

  const increaseQuantity = async (id, type) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const res = await fetch(`http://localhost:5020/api/cart/${id}/increaseQuant`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("increase quant failed:", errorData.error);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === id && item.type === type
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = async (id, type) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const res = await fetch(`http://localhost:5020/api/cart/${id}/decreaseQuant`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res) {
      const errorData = await res.json();
      console.error("Add to cart failed:", errorData.error);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === id && item.type === type && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cartItems, setCartItems, addToCart, removeFromCart, getTotalPrice,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
