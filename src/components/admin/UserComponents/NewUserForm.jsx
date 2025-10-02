import React, { useState } from "react";

export const NewUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "http://31.97.61.6:5000/api/employer/staff/create";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ✅ Get token from localStorage
      const token = localStorage.getItem("token"); 
      if (!token) {
        setMessage("❌ Token not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ User created successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
      } else {
        setMessage(`❌ Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("❌ Network error, please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-center bg-gray-100 p-8">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex w-full max-w-2xl ">
          <div className="w-full p-8">
            <h2 className="text-xl font-bold text-[#0078db] mb-6">AUTHLOG</h2>
            <h3 className="text-2xl font-semibold mb-6">Create User</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-[#0078db] border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I Accept{" "}
                  <span className="text-[#0078db]">Terms And Condition</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0078db] text-white py-2 rounded-lg hover:bg-[#005fa3] transition"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            {/* Message */}
            {message && (
              <p className="mt-4 text-center text-sm font-medium text-red-500">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
