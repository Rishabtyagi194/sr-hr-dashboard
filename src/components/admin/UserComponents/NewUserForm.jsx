import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const NewUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [access, setAccess] = useState("User");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API_URL =
    "https://qa.api.rozgardwar.cloud/api/employer/staff/create";

  // 🔥 Live password match state
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const validate = () => {
    if (!firstName.trim()) return "First name is required";
    if (!lastName.trim()) return "Last name is required";

    if (!phone.trim()) return "Phone is required";
    if (!/^[6-9]\d{9}$/.test(phone))
      return "Enter valid 10 digit phone number";

    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter valid email address";

    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters";

    if (!confirmPassword) return "Confirm password is required";
    if (password !== confirmPassword)
      return "Passwords do not match";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
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
          access,
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
        setAccess("User");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Network error, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex w-full max-w-2xl">
        <div className="w-full p-8">
          <h2 className="text-xl font-bold text-[#0078db] mb-6">RD</h2>
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
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none 
                  ${passwordsMismatch ? "border-red-500" : ""}
                  ${passwordsMatch ? "border-green-500" : ""}
                `}
              />
              <span
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              {passwordsMismatch && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}

              {passwordsMatch && (
                <p className="text-green-600 text-xs mt-1">
                  Passwords matched ✓
                </p>
              )}
            </div>

            {/* Access Toggle */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Company Data Access <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="access"
                    value="Admin"
                    checked={access === "Admin"}
                    onChange={(e) => setAccess(e.target.value)}
                    className="text-[#0078db]"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="access"
                    value="User"
                    checked={access === "User"}
                    onChange={(e) => setAccess(e.target.value)}
                    className="text-[#0078db]"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
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
                <span className="text-[#0078db]">
                  Terms And Condition
                </span>
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

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
