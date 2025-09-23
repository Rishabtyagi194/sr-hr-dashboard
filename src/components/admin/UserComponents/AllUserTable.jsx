import React from "react";

export const AllUsersTable = () => {
  // Example static users (replace with API data later)
  const users = [
    {
      id: 1,
      firstName: "Abdul",
      lastName: "Khan",
      email: "abdul@gmail.com",
      password: "******",
      confirmPassword: "******",
    },
    {
      id: 2,
      firstName: "Mukti",
      lastName: "Jindal",
      email: "mukti@gmail.com",
      password: "******",
      confirmPassword: "******",
    },
  ];

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
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b text-sm hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.password}</td>
                  <td className="px-4 py-2">{user.confirmPassword}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <a href="/createuser" className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600">
                      Edit
                    </a>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
