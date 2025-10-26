import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa";

export const Navbar = () => {
  return (
    <div className=" bg-white   py-6 px-6 border-b  border-gray-200 shadow-md  ">
      <div className="flex items-end justify-end gap-4 cursor-pointer  ">
        <a
          href="/my-archive"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload CV
        </a>

        <FaBell className="w-8 h-6" />
        <CgProfile className="w-8 h-6" />
      </div>
    </div>
  );
};
