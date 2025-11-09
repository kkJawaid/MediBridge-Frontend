// src/pages/admin/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const accent = "#9C27B0";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    // navigate to homepage and refresh UI
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r">
        <div className="p-6 flex items-center gap-3 border-b">
          <div className="w-10 h-10 rounded-lg bg-[#9C27B0] flex items-center justify-center text-white font-bold">
            M
          </div>
          <div>
            <h1 className="text-lg font-semibold" style={{ color: accent }}>
              MediBridge
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${isActive ? "bg-[#F3E8FF] text-[#5B21B6]" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/manage-products"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${isActive ? "bg-[#F3E8FF] text-[#5B21B6]" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                Manage Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/manage-orders"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${isActive ? "bg-[#F3E8FF] text-[#5B21B6]" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                Manage Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/manage-users"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${isActive ? "bg-[#F3E8FF] text-[#5B21B6]" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                Manage Users
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-md text-sm bg-red-50 text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-700">
                Welcome to MediBridge Dashboard
              </h2>
              <p className="text-sm text-gray-500">Analytics & Overview</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome, Admin</p>
                <p className="text-xs text-gray-400">admin@medibridge.com</p>
              </div>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-[#9C27B0]">120</h3>
            </div>
            <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-[#9C27B0]">85</h3>
            </div>
            <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold text-[#9C27B0]">45</h3>
            </div>
            <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-[#9C27B0]">$12,500</h3>
            </div>
          </div>
        </header>


        {/* Outlet renders AdminPanel or CMS pages */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
