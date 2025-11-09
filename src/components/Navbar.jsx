import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="w-full bg-white/85 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#9C27B0] flex items-center justify-center shadow-md">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2L15 8l6 .5-4.5 4 1.5 6L12 15l-6 3 1.5-6L3 8.5 9 8z" />
            </svg>
          </div>
          <Link to="/" className="text-xl font-semibold text-[#9C27B0]">
            MediBridge
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700">
          <li><Link to="/" className="hover:text-[#9C27B0] transition-colors">Home</Link></li>
          <li><Link to="/services" className="hover:text-[#9C27B0] transition-colors">Services</Link></li>
          <li><Link to="/equipment" className="hover:text-[#9C27B0] transition-colors">Equipment</Link></li>
          <li><Link to="/about" className="hover:text-[#9C27B0] transition-colors">About</Link></li>
          
          {!!user && (
            <li><Link to="/profile" className="hover:text-[#9C27B0] transition-colors">Profile</Link></li>
          )}

          {/* Only show Admin Dashboard if logged in as admin */}
          {user?.role === "admin" && (
            <li>
              <Link
                to="/admin"
                className="px-3 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700"
              >
                Admin Dashboard
              </Link>
            </li>
          )}

          {/* Show greeting for logged-in user */}
          {user && user.role === "user" && (
            <li className="text-sm text-gray-600">
              Welcome, {user.full_name || "User"}
            </li>
          )}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {!user && (
            <Link
              to="/register"
              className="text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Register
            </Link>
          )}
          <div className="relative cursor-pointer">
           <ShoppingCart 
              className="w-6 h-6 text-gray-700 hover:text-[#A36DBD]"
              onClick={() => navigate("/cart")}
            />
          </div>

          {user && (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
              className="text-sm font-medium text-gray-600 hover:text-red-600"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            aria-label="Open menu"
            className="p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm px-6 py-4 shadow-md">
          <ul className="flex flex-col gap-4 text-gray-700">
            <li><Link to="/" className="hover:text-[#9C27B0] transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-[#9C27B0] transition-colors">Services</Link></li>
            <li><Link to="/equipment" className="hover:text-[#9C27B0] transition-colors">Equipment</Link></li>
            <li><Link to="/about" className="hover:text-[#9C27B0] transition-colors">About</Link></li>
            
            {user?.role === "admin" && (
              <li>
                <Link to="/admin" className="hover:text-[#9C27B0] transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            )}

            {!user && (
              <li><Link to="/register" className="hover:text-gray-800 transition-colors">Register</Link></li>
            )}

            <li>
           <ShoppingCart 
              className="w-6 h-6 text-gray-700 hover:text-[#A36DBD]"
              onClick={() => navigate("/cart")}
            /></li>

            {user && (
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                  className="text-left text-gray-600 hover:text-red-600"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
