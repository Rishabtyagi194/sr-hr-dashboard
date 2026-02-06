import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  UserPlus,
  Search,
  FileSearch,
  Send,
  ChevronDown,
} from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/home", icon: <Home size={20} /> },
  { name: "Job Posting", path: "/jobposting", icon: <UserPlus size={20} /> },
  { name: "Create User", path: "/createuser", icon: <UserPlus size={20} /> },
  { name: "All Users", path: "/users", icon: <UserPlus size={20} /> },
  { name: "My Archive", path: "/my-archive", icon: <UserPlus size={20} /> },
  // { name: "Consultant Uploded Resume ", path: "/consultant-uploded-resume", icon: <UserPlus size={20} /> },

];

const resdexSubItems = [
  { name: "Manage Searches", path: "/resdex/manage-search", icon: <Search size={16} /> },
  { name: "Search Resumes", path: "/resdex/resume-search", icon: <FileSearch size={16} /> },
  { name: "Send NVites", path: "/resdex/send-nvites", icon: <Send size={16} /> },
  { name: "Folders", path: "/resdex/folders", icon: <Send size={16} /> },
  { name: "Resdex Requirements", path: "/resdex/requirements", icon: <Send size={16} /> },
];

const ResdexNavbar = () => {

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
  const [openResdex, setOpenResdex] = useState(false);
  const location = useLocation();

  const isResdexActive = location.pathname.startsWith("/resdex");

  return (
    <div className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="text-lg font-semibold text-blue-600">
         Rozgar Dwar
        </div>

        {/* Main Nav */}
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}

          {/* Resdex Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenResdex((prev) => !prev)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition
                ${
                  isResdexActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Search size={20} />
              Resdex
              <ChevronDown size={16} />
            </button>

            {openResdex && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                {resdexSubItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpenResdex(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 text-sm transition
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
      <div className="flex items-center justify-end gap-4 relative">
            <a
              href="/my-uploads"
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
    </div>
  );
};

export default ResdexNavbar;
