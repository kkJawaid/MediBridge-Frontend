// src/pages/ManageOrders.jsx
import React, { useState } from "react";

const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: "2012323467",
      customer: "Muhammad Fateh",
      service: "Domain Service",
      date: "01/03/2024",
      amount: "$1200.00",
      payment: "Paid By Mastercard",
      status: "Active",
    },
    {
      id: "2012323500",
      customer: "Anderson Jeck",
      service: "Hosting Service",
      date: "05/03/2024",
      amount: "$4200.00",
      payment: "Paid By Visacard",
      status: "Active",
    },
    {
      id: "2012323777",
      customer: "Km Shahriar",
      service: "Company Email",
      date: "10/03/2024",
      amount: "$700.00",
      payment: "Unpaid",
      status: "Pending",
    },
    {
      id: "2012323998",
      customer: "Saleh Madani",
      service: "Domain Service",
      date: "12/03/2024",
      amount: "$300.00",
      payment: "Paid By Madacard",
      status: "Pending",
    },
    {
      id: "2012323193",
      customer: "Mustafa Sahan",
      service: "Domain Service",
      date: "15/03/2024",
      amount: "$700.00",
      payment: "Paid By Mastercard",
      status: "Cancelled",
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    customer: "",
    service: "",
    date: "",
    amount: "",
    payment: "",
    status: "Pending",
  });

  const filteredOrders = orders
    .filter((order) => {
      if (activeTab === "approved") return order.status === "Active";
      if (activeTab === "pending") return order.status === "Pending";
      if (activeTab === "cancelled") return order.status === "Cancelled";
      return true;
    })
    .filter(
      (order) =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateOrder = () => {
    if (!formData.customer || !formData.service || !formData.amount) return;

    if (editingOrder) {
      setOrders(
        orders.map((o) => (o.id === editingOrder.id ? { ...formData } : o))
      );
    } else {
      setOrders([
        ...orders,
        { ...formData, id: Date.now().toString(), amount: `$${formData.amount}` },
      ]);
    }

    setFormData({
      id: "",
      customer: "",
      service: "",
      date: "",
      amount: "",
      payment: "",
      status: "Pending",
    });
    setEditingOrder(null);
    setShowForm(false);
  };

  const handleEdit = (order) => {
    setFormData({ ...order, amount: order.amount.replace("$", "") });
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#9C27B0" }}>
          Manage Orders
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingOrder(null);
            setFormData({
              id: "",
              customer: "",
              service: "",
              date: "",
              amount: "",
              payment: "",
              status: "Pending",
            });
          }}
          className="text-white px-4 py-2 rounded-lg"
          style={{ backgroundColor: "#9C27B0" }}
        >
          {showForm ? "Close Form" : "+ Add New Order"}
        </button>
      </div>

      {/* Tabs Section */}
      <div className="flex gap-6 mb-4 border-b pb-2">
        {[
          { key: "all", label: "All Orders" },
          { key: "approved", label: "Approved Orders" },
          { key: "pending", label: "Pending Orders" },
          { key: "cancelled", label: "Cancelled Orders" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-semibold text-black pb-2 ${
              activeTab === tab.key
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
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Customer Name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Service Name or Equipment Name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <input
              type="text"
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              placeholder="Payment Status"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            >
              <option>Pending</option>
              <option>Active</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddOrUpdateOrder}
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
              <th className="border border-gray-200 p-3 text-left">Service</th>
              <th className="border border-gray-200 p-3 text-left">Date</th>
              <th className="border border-gray-200 p-3 text-left">Amount</th>
              <th className="border border-gray-200 p-3 text-left">Payment</th>
              <th className="border border-gray-200 p-3 text-left">Status</th>
              <th className="border border-gray-200 p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="border border-gray-200 p-3">{order.id}</td>
                  <td className="border border-gray-200 p-3">{order.customer}</td>
                  <td className="border border-gray-200 p-3">{order.service}</td>
                  <td className="border border-gray-200 p-3">{order.date}</td>
                  <td className="border border-gray-200 p-3">{order.amount}</td>
                  <td className="border border-gray-200 p-3">{order.payment}</td>
                  <td className="border border-gray-200 p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
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
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
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
