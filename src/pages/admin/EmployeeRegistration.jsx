import React, { useState } from "react";

const EmployerRegistration = () => {
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
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.employerEmail)) {
      newErrors.employerEmail = "Enter a valid email address";
    }

    if (!/^[6-9]\d{9}$/.test(formData.employerPhone)) {
      newErrors.employerPhone = "Enter a valid 10-digit phone number";
    }

    if (
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
      if (!response.ok) throw new Error(data.message || "Registration failed");

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
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

        {/* 🔔 PASSWORD WARNING */}
        <div className="mb-5 p-3 bg-yellow-50 border border-yellow-300 rounded text-sm text-yellow-700">
          Password must contain at least <b>8 characters</b>, including
          <b> uppercase</b>, <b>lowercase</b>, <b>number</b>, and
          <b> special character</b>.
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {error && (
              <p className="col-span-3 text-center text-red-500">{error}</p>
            )}

            {/* Company Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="border rounded-lg p-2"
              />
            </div>

            {/* Industry */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="border rounded-lg p-2"
              />
            </div>

            {/* Company Size */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Company Size</label>
              <input
                type="text"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                required
                className="border rounded-lg p-2"
              />
            </div>

            {/* Website */}
            <div className="flex flex-col md:col-span-3">
              <label className="text-sm font-medium mb-1">Company Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                className="border rounded-lg p-2"
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
                className="border rounded-lg p-2"
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
                className="border rounded-lg p-2"
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
                className="border rounded-lg p-2"
              />
              {errors.employerPhone && (
                <span className="text-xs text-red-500">
                  {errors.employerPhone}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col md:col-span-3">
              <label className="text-sm font-medium mb-1">Company Address</label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                required
                className="border rounded-lg p-2"
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
                className="border rounded-lg p-2"
              />
              {errors.employerEmail && (
                <span className="text-xs text-red-500">
                  {errors.employerEmail}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border rounded-lg p-2"
              />

              {passwordStrength && (
                <span
                  className={`text-xs mt-1 ${
                    passwordStrength === "Weak"
                      ? "text-red-500"
                      : passwordStrength === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  Password Strength: {passwordStrength}
                </span>
              )}

              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Submit */}
            <div className="col-span-1 md:col-span-3 text-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg font-semibold text-yellow-600">
              Verification Pending
            </p>
            <p className="text-gray-600 mt-2">
              Your registration has been submitted successfully.  
              We’ll verify your details shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerRegistration;
