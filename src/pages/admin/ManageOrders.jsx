// src/pages/ManageOrders.jsx
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    status: "Pending",
  });

  //Fetch products from backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem("user"));
      const token = admin?.token;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/viewAllOrders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      const status = order.status.toLowerCase();
      if (activeTab === "completed") return order.status === "completed";
      if (activeTab === "dispatched") return order.status === "dispatched";
      if (activeTab === "pending") return order.status === "pending";
      if (activeTab === "cancelled") return order.status === "cancelled";
      return true;
    })
    .filter(
      (order) =>
        order.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.order_id.toString().includes(searchTerm.toLowerCase())
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateOrder = async (id) => {
    const admin = JSON.parse(localStorage.getItem("user"));
    const token = admin?.token;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({status: formData.status.toLowerCase()})
    });
    if (!res.ok) throw new Error("Failed to update product");
    setOrders(orders => orders.map(order => order.order_id === id ? {...order, status : formData.status.toLowerCase()} : order))
    setFormData({
      status: "pending",
    });
    setEditingOrder(null);
    setShowForm(false);
   
  };

  const handleEdit = (order) => {
    setFormData({ ...order });
    setEditingOrder(order);
    setShowForm(true);
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#9C27B0" }}>
          Manage Orders
        </h1>
      </div>

      {/* Tabs Section */}
      <div className="flex gap-6 mb-4 border-b pb-2">
        {[
          { key: "all", label: "All Orders" },
          { key: "completed", label: "Completed Orders" },
          { key: "pending", label: "Pending Orders" },
          { key: "dispatched", label: "Dispatched Orders" },
          { key: "cancelled", label: "Cancelled Orders" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-semibold text-black pb-2 ${activeTab === tab.key
              ? "border-b-2 border-[#9C27B0]"
              : "hover:text-[#9C27B0]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name..."
          className="w-1/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9C27B0]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: "#9C27B0" }}>
            {editingOrder ? "Edit Order" : "Add New Order"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Dispatched</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleAddOrUpdateOrder(formData.order_id)}
              className="text-white px-6 py-2 rounded-lg"
              style={{ backgroundColor: "#9C27B0" }}
            >
              {editingOrder ? "Update Order" : "Add Order"}
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto p-4">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="border border-gray-200 p-3 text-left">Order ID</th>
              <th className="border border-gray-200 p-3 text-left">Customer Name</th>
              <th className="border border-gray-200 p-3 text-left">Date</th>
              <th className="border border-gray-200 p-3 text-left">Amount</th>
              <th className="border border-gray-200 p-3 text-left">Payment</th>
              <th className="border border-gray-200 p-3 text-left">Contact</th>
              <th className="border border-gray-200 p-3 text-left">Address</th>
              <th className="border border-gray-200 p-3 text-left">Status</th>
              <th className="border border-gray-200 p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="border border-gray-200 p-3">{order.order_id}</td>
                  <td className="border border-gray-200 p-3">{order.user.full_name}</td>
                  <td className="border border-gray-200 p-3">{format(order.created_at, "dd MMM yyyy")}</td>
                  <td className="border border-gray-200 p-3">{order.total_amount}</td>
                  <td className="border border-gray-200 p-3">{order.payment.payment_method}</td>
                  <td className="border border-gray-200 p-3">{order.contact}</td>
                  <td className="border border-gray-200 p-3">{order.address}</td>
                  <td className="border border-gray-200 p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"  || order.status === "dispatched"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 p-3 text-center">
                    <button
                      onClick={() => handleEdit(order)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border border-gray-200 text-center py-6 text-gray-500 italic"
                >
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
