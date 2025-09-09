import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, UserPlus } from "lucide-react";
import { Navbar } from "./Navbar";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/home", icon: <Home size={20} /> },
    { name: "Job Posting", path: "/jobposting", icon: <UserPlus size={20} /> },
    { name: "Customers", path: "/customers", icon: <Users size={20} /> },
    { name: "Create User", path: "/createuser", icon: <UserPlus size={20} /> },
    { name: "All Users", path: "/users", icon: <UserPlus size={20} /> },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-black text-white shadow-lg flex flex-col">
      <h2 className="text-2xl font-bold text-center py-6  ">
        Dashboard
      </h2>
      <nav className="flex-1 p-4 space-y-2">
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
      </nav>
    
    </div>
  );
};

export default Sidebar;
