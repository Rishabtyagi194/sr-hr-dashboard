import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployerRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    companyPhone: "",
    companyAddress: "",
    employerName: "",
    employerEmail: "",
    employerPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  // ---------------- PASSWORD STRENGTH ----------------
  const calculatePasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (!password) setPasswordStrength("");
    else if (score <= 2) setPasswordStrength("Weak");
    else if (score <= 4) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "This field is required";
      }
    });

    if (
      formData.employerEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.employerEmail)
    ) {
      newErrors.employerEmail = "Enter a valid email address";
    }

    if (
      formData.employerPhone &&
      !/^[6-9]\d{9}$/.test(formData.employerPhone)
    ) {
      newErrors.employerPhone = "Enter a valid 10-digit phone number";
    }

    if (
      formData.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be 8+ chars with uppercase, lowercase, number & symbol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://qa.api.rozgardwar.cloud/api/organization/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            organisationData: {
              name: formData.companyName,
              industry: formData.industry,
              size: formData.companySize,
              website: formData.website,
              contact_email: formData.employerEmail,
              contact_phone: formData.companyPhone,
              address: formData.companyAddress,
              verified: true,
              status: "active",
            },
            userData: {
              name: formData.employerName,
              email: formData.employerEmail,
              password: formData.password,
              phone: formData.employerPhone,
              role: "employer_admin",
              permissions: null,
              is_active: true,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // ✅ Redirect after OTP sent (2 sec delay for UX)
      setSuccessMessage(data.message || "OTP sent successfully!");

      setTimeout(() => {
        navigate("/verify", {
          state: { email: formData.employerEmail },
        });
      }, 1500);

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Employer Registration
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-600 font-medium">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 text-center text-green-600 font-medium">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
                      {/* Company Name */}
                      <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 cursor-pointer"
              />
              {errors.companyName && (
                <span className="text-xs text-red-500">
                  {errors.companyName}
                </span>
              )}
            </div>

            {/* Industry */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 bg-white cursor-pointer"
              >
                <option value="">Select industry</option>
                <option value="IT & Software">IT & Software</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Retail">Retail</option>
                <option value="Construction">Construction</option>
                <option value="Logistics">Logistics</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Marketing & Advertising">
                  Marketing & Advertising
                </option>
                <option value="E-commerce">E-commerce</option>
                <option value="Others">Others</option>
              </select>
              {errors.industry && (
                <span className="text-xs text-red-500">
                  {errors.industry}
                </span>
              )}
            </div>

            {/* Company Size */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Company Size</label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 bg-white cursor-pointer"
              >
                <option value="">Select company size</option>
                <option value="1-10">1–10</option>
                <option value="10-50">10–50</option>
                <option value="50-100">50–100</option>
                <option value="100+">100+</option>
              </select>
              {errors.companySize && (
                <span className="text-xs text-red-500">
                  {errors.companySize}
                </span>
              )}
            </div>

                     {/* Website */}
                     <div className="flex flex-col md:col-span-3">
              <label className="text-sm font-medium mb-1">
                Company Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 cursor-pointer"
              />
            </div>

            {/* Company Phone */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Company Phone</label>
              <input
                type="text"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 cursor-pointer"
              />
            </div>

            {/* Employer Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Employer Name</label>
              <input
                type="text"
                name="employerName"
                value={formData.employerName}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 cursor-pointer"
              />
            </div>

            {/* Employer Phone */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Employer Phone</label>
              <input
                type="text"
                name="employerPhone"
                value={formData.employerPhone}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 cursor-pointer"
              />
              {errors.employerPhone && (
                <span className="text-xs text-red-500">
                  {errors.employerPhone}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col md:col-span-3">
              <label className="text-sm font-medium mb-1">
                Company Address
              </label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 cursor-pointer"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Employer Email</label>
              <input
                type="email"
                name="employerEmail"
                value={formData.employerEmail}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 cursor-pointer"
              />
              {errors.employerEmail && (
                <span className="text-xs text-red-500">
                  {errors.employerEmail}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="text-sm font-medium mb-1">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 pr-12 cursor-pointer"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>

              {passwordStrength && (
                <span className="text-xs mt-1">
                  Password Strength: {passwordStrength}
                </span>
              )}

              {errors.password && (
                <span className="text-xs text-red-500">{errors.password}</span>
              )}
            </div>

          {/* Submit */}
          <div className="col-span-1 md:col-span-3 text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerRegistration;
