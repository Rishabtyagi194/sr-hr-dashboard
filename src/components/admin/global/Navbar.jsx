import React, { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // ✅ Clear token and user info
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Close dropdown and redirect to login page
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="bg-white py-6 px-6 border-b border-gray-200 shadow-md">
      <div className="flex items-center justify-end gap-4 relative">
        <a
          href="/my-archive"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Uploads
        </a>

        <FaBell className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600 transition" />

        <div className="relative" ref={dropdownRef}>
          <CgProfile
            className="w-8 h-8 text-gray-700 cursor-pointer hover:text-blue-600 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
