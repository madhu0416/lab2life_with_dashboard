import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-orange-400 font-semibold"
      : "text-gray-300 hover:text-orange-400 transition";

  const token = sessionStorage.getItem("lab2life_token");
  const patientName = sessionStorage.getItem("lab2life_patient_name");
  const isSubscribed =
    sessionStorage.getItem("lab2life_subscription") === "true";

  const handleLogout = () => {
    sessionStorage.clear();
    alert("Logged out successfully");
    navigate("/");
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          Lab<span className="text-orange-400">2</span>Life
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/upload" className={navLinkClass}>
            Upload Report
          </NavLink>
          <NavLink to="/summary" className={navLinkClass}>
            Summary
          </NavLink>
          <NavLink to="/ask-doctor" className={navLinkClass}>
            Ask Doctor
          </NavLink>
          <NavLink to="/doctors" className={navLinkClass}>
            Doctors
          </NavLink>
          <NavLink to="/subscription" className={navLinkClass}>
            Subscription
          </NavLink>

          {/* 🔥 Profile Section */}
          {!token ? (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Icon */}
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold"
              >
                {patientName?.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {open && (
  <div className="absolute right-0 mt-3 w-56 bg-[#1c1f27] border border-gray-800 rounded-xl shadow-lg p-4">

    <p className="text-sm text-gray-400">Logged in as</p>
    <p className="text-white font-semibold mb-3">
      {patientName}
    </p>

    <p className="text-sm text-gray-400">Subscription</p>
    <p
      className={`font-semibold mb-4 ${
        isSubscribed ? "text-green-400" : "text-red-400"
      }`}
    >
      {isSubscribed ? "Active" : "Not Subscribed"}
    </p>

    {/* ✅ NEW BUTTON */}
    <button
      onClick={() => {
        setOpen(false);
        navigate("/my-reports");
      }}
      className="w-full mb-3 text-sm bg-white/10 py-2 rounded-lg hover:bg-white/20 transition"
    >
      My Reports
    </button>

    <button
      onClick={() => {
        setOpen(false);
        navigate("/subscription");
      }}
      className="w-full mb-3 text-sm bg-white/10 py-2 rounded-lg hover:bg-white/20 transition"
    >
      Manage Subscription
    </button>

    <button
      onClick={handleLogout}
      className="w-full text-sm bg-red-500 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  </div>
)}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}