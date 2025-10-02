"use client";
import React, { useEffect, useState } from "react";

export const AllUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          console.error("No token found in localStorage");
          setLoading(false);
          return;
        }

        const response = await fetch("hhttp://31.97.61.6:5000/api/employer/staff/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        console.log("Users:", data);

        // Assuming API returns an array of users
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold text-[#0078db] mb-4">All Users</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-[#0078db] text-white text-left text-sm">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Password</th>
                <th className="px-4 py-2">Confirm Password</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className="border-b text-sm hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.firstName || ""}</td>
                    <td className="px-4 py-2">{user.lastName || ""}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">******</td>
                    <td className="px-4 py-2">******</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <a
                        href="/createuser"
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
                      >
                        Edit
                      </a>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
