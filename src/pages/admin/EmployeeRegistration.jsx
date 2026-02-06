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

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://qa.api.rozgardwar.cloud/api/organization/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

      // ✅ STORE DATA IN SESSION STORAGE (ONLY CHANGE)
      sessionStorage.setItem(
        "employerRegistration",
        JSON.stringify({
          companyName: formData.companyName,
          industry: formData.industry,
          companySize: formData.companySize,
          website: formData.website,
          companyPhone: formData.companyPhone,
          companyAddress: formData.companyAddress,
          employerName: formData.employerName,
          employerEmail: formData.employerEmail,
          employerPhone: formData.employerPhone,
        })
      );

      // Frequently used fields (UNCHANGED KEYS)
      sessionStorage.setItem("email", formData.employerEmail);
      sessionStorage.setItem("role", "employer_admin");
      sessionStorage.setItem("employerEmail", formData.employerEmail);
      sessionStorage.setItem("employerPhone", formData.employerPhone);

      console.log("Registration success:", data);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Employer Registration
        </h2>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {error && (
              <p className="col-span-3 text-center text-red-500">{error}</p>
            )}

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="industry"
              placeholder="Industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="companySize"
              placeholder="Company Size (e.g. 11-50)"
              value={formData.companySize}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="website"
              placeholder="Company Website"
              value={formData.website}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 col-span-1 md:col-span-3"
            />

            <input
              type="text"
              name="companyPhone"
              placeholder="Company Phone"
              value={formData.companyPhone}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="companyAddress"
              placeholder="Company Address"
              value={formData.companyAddress}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 col-span-1 md:col-span-3"
            />

            <input
              type="text"
              name="employerName"
              placeholder="Employer Name"
              value={formData.employerName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="employerEmail"
              placeholder="Employer Email"
              value={formData.employerEmail}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="employerPhone"
              placeholder="Employer Phone"
              value={formData.employerPhone}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            <div className="col-span-1 md:col-span-3 mt-6 text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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

            <div className="col-span-1 md:col-span-3 mt-6 text-center">
              <a
                href="/verify"
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Verify
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerRegistration;
