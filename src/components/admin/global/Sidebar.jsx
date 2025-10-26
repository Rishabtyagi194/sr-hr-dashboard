import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, UserPlus, ChevronDown, ChevronUp, FileSearch, Search, Send } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [openResdex, setOpenResdex] = useState(false);

  const navItems = [
    { name: "Home", path: "/home", icon: <Home size={20} /> },
    { name: "Job Posting", path: "/jobposting", icon: <UserPlus size={20} /> },
    { name: "Create User", path: "/createuser", icon: <UserPlus size={20} /> },
    { name: "All Users", path: "/users", icon: <UserPlus size={20} /> },
    { name: "My Archive", path: "/my-archive", icon: <UserPlus size={20} /> },
  ];

  const resdexSubItems = [
    { name: "Manage Searches", path: "/resdex/manage-search", icon: <Search size={16} /> },
    { name: "Search Resumes ", path: "/resdex/resume-search", icon: <FileSearch size={16} /> },
    { name: "Send NVites", path: "/resdex/send-nvites", icon: <Send size={16} /> },
    { name: "Folders", path: "/resdex/folders", icon: <Send size={16} /> },
    { name: "Resdex Requirements", path: "/resdex/requirements", icon: <Send size={16} /> },

  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-black text-white shadow-lg flex flex-col">
      <h2 className="text-2xl font-bold text-center py-6">Dashboard</h2>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Static Nav Items */}
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
              ${
                location.pathname === item.path
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}

        {/* Resdex Section */}
        <div>
          <button
            onClick={() => setOpenResdex(!openResdex)}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition ${
              location.pathname.startsWith("/resdex")
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span>Resdex</span>
            </div>
            {openResdex ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {openResdex && (
            <div className="ml-10 mt-1 space-y-1">
              {resdexSubItems.map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className={`flex items-center gap-2 px-2 py-1 text-sm rounded-lg transition ${
                    location.pathname === sub.path
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {sub.icon}
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
