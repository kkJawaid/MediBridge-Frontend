// src/pages/admin/ManagePayments.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Backend not connected yet, so we’ll use dummy data
        // Uncomment this line later when backend is ready:
        // const response = await axios.get("http://localhost:5000/api/payments");
        // setPayments(response.data);

        // Temporary dummy data
        setPayments([
          {
            payment_id: 1,
            order_id: 101,
            payment_method: "COD",
            payment_status: "completed",
            transaction_reference: "N/A",
            created_at: new Date(),
          },
          {
            payment_id: 2,
            order_id: 102,
            payment_method: "Stripe",
            payment_status: "pending",
            transaction_reference: "TXN-3453",
            created_at: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.order_id.toString().includes(search) ||
      payment.payment_method.toLowerCase().includes(search.toLowerCase()) ||
      payment.payment_status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-[#9C27B0]">Manage Payments</h1>

        <input
          type="text"
          placeholder="Search payment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#9C27B0]"
        />
      </div>

      {/* Table Section */}
      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-3 text-left">Payment ID</th>
                <th className="border p-3 text-left">Order ID</th>
                <th className="border p-3 text-left">Method</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Transaction Ref</th>
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.payment_id} className="hover:bg-gray-50">
                    <td className="border p-3">{payment.payment_id}</td>
                    <td className="border p-3">{payment.order_id}</td>
                    <td className="border p-3">{payment.payment_method}</td>
                    <td className="border p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          payment.payment_status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment.payment_status}
                      </span>
                    </td>
                    <td className="border p-3">
                      {payment.transaction_reference || "—"}
                    </td>
                    <td className="border p-3">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td className="border p-3">
                      <button
                        onClick={() => alert("View details coming soon")}
                        className="bg-[#9C27B0] text-white px-4 py-1 rounded-lg hover:bg-[#7B1FA2] transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="border p-3 text-center text-gray-500"
                  >
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagePayments;
