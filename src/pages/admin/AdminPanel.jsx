import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaBox,
  FaMoneyBill,
  FaShoppingCart,
  FaSignOutAlt,
  FaChartLine,
  FaDoorOpen,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/admin";

  // Dummy data (same shape as backend)
  // const [analytics] = useState({
  //   totalOrders: 1600,
  //   totalUsers: 2000,
  //   totalProducts: 140,
  //   cancelledOrders: 120,
  //   approvedOrders: 1480,
  // });

  // const salesData = [
  //   { month: "Jan", current: 30, last: 20 },
  //   { month: "Feb", current: 50, last: 40 },
  //   { month: "Mar", current: 70, last: 60 },
  //   { month: "Apr", current: 90, last: 80 },
  //   { month: "May", current: 60, last: 70 },
  //   { month: "Jun", current: 80, last: 60 },
  //   { month: "Jul", current: 100, last: 70 },
  // ];

  // const productViews = [
  //   { day: "Mon", thisWeek: 4000, lastWeek: 2400 },
  //   { day: "Tue", thisWeek: 3000, lastWeek: 1398 },
  //   { day: "Wed", thisWeek: 2000, lastWeek: 9800 },
  //   { day: "Thu", thisWeek: 2780, lastWeek: 3908 },
  //   { day: "Fri", thisWeek: 1890, lastWeek: 4800 },
  //   { day: "Sat", thisWeek: 2390, lastWeek: 3800 },
  //   { day: "Sun", thisWeek: 3490, lastWeek: 4300 },
  // ];

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const res = await fetch("http://localhost:5020/api/admin/analytics", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      setAnalytics(data);
    }

    fetchAnalytics();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleBackToHome = () => navigate("/");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 flex items-center gap-3 border-b">
            <div className="w-10 h-10 rounded-lg bg-[#9C27B0] flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <h2 className="text-lg font-semibold text-[#9C27B0]">MediBridge</h2>
          </div>

          <nav className="mt-6 flex flex-col gap-1 px-4">
            {[
              { path: "/admin", label: "Dashboard", icon: <FaChartLine /> },
              // { path: "/admin/manage-users", label: "Users", icon: <FaUser /> },
              { path: "/admin/manage-products", label: "Products", icon: <FaBox /> },
              { path: "/admin/manage-orders", label: "Orders", icon: <FaShoppingCart /> },
              { path: "/admin/manage-payments", label: "Payments", icon: <FaMoneyBill /> },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${location.pathname === link.path
                    ? "bg-[#9C27B0]/10 text-[#9C27B0]"
                    : "text-gray-700 hover:bg-[#9C27B0]/10 hover:text-[#9C27B0]"
                  }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-4 py-4 border-t space-y-2">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#9C27B0] font-medium hover:bg-[#9C27B0]/10 w-full"
          >
            <FaDoorOpen /> Back to Home
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 w-full"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Welcome to MediBridge Dashboard
            </h1>
            <p className="text-sm text-gray-500">Analytics & Overview</p>
          </div>
        </div>

        {isDashboard ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="p-6 rounded-2xl shadow-sm bg-purple-100 text-[#9C27B0]">
                <h2 className="text-2xl font-bold">{analytics?.totalUsers}</h2>
                <p className="text-sm">Total Customers</p>
              </div>
              <div className="p-6 rounded-2xl shadow-sm bg-yellow-100 text-yellow-600">
                <h2 className="text-2xl font-bold">{analytics?.totalProducts}</h2>
                <p className="text-sm">Total Products</p>
              </div>
              <div className="p-6 rounded-2xl shadow-sm bg-pink-100 text-pink-600">
                <h2 className="text-2xl font-bold">{analytics?.totalOrders}</h2>
                <p className="text-sm">Total Orders</p>
              </div>
              <div className="p-6 rounded-2xl shadow-sm bg-green-100 text-green-600">
                <h2 className="text-2xl font-bold">{analytics?.approvedOrders}</h2>
                <p className="text-sm">Approved Orders</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-md h-[400px]">
                <h3 className="font-semibold mb-4">Sales Trend</h3>
                {/* <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#9C27B0"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="last"
                      stroke="#f43f5e"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer> */}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md h-[400px]">
                <h3 className="font-semibold mb-4">Product Views</h3>
                {/* <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={productViews}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="thisWeek" fill="#9C27B0" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="lastWeek" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer> */}
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
