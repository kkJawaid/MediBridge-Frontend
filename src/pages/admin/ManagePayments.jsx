import  { useState, useEffect } from "react";
import { format } from "date-fns";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const admin = JSON.parse(localStorage.getItem("user"));
        const token = admin?.token;
        const res = await fetch("http://localhost:5020/api/payments/getAllPayments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setPayments(data);
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
                        className={`px-2 py-1 rounded-full text-xs ${payment.payment_status === "completed"
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
                      {format(payment.payment_date, "dd MMM yyyy")}
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
