import React, { useState } from "react";

const EmployerRegistration = () => {
  const [formData, setFormData] = useState({
    category: "",
    plan: "",
    companyName: "",
    industry: "",
    companySize: "",
    employerName: "",
    employerEmail: "",
    password: "",
    razorpayOrderId: "",
    razorpayPaymentId: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true); // show verification pending
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
            {/* Category */}
            {/* <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            /> */}

            {/* Plan */}
            {/* <input
              type="text"
              name="plan"
              placeholder="Plan"
              value={formData.plan}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            /> */}

            {/* Company Name */}
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            {/* Industry */}
            <input
              type="text"
              name="industry"
              placeholder="Industry"
              value={formData.industry}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            {/* Company Size */}
            <input
              type="text"
              name="companySize"
              placeholder="Company Size"
              value={formData.companySize}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            {/* Employer Name */}
            <input
              type="text"
              name="employerName"
              placeholder="Employer Name"
              value={formData.employerName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            {/* Employer Email */}
            <input
              type="email"
              name="employerEmail"
              placeholder="Employer Email"
              value={formData.employerEmail}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />

            {/* Razorpay Order ID */}
            {/* <input
              type="text"
              name="razorpayOrderId"
              placeholder="Razorpay Order ID"
              value={formData.razorpayOrderId}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            /> */}

            {/* Razorpay Payment ID */}
            {/* <input
              type="text"
              name="razorpayPaymentId"
              placeholder="Razorpay Payment ID"
              value={formData.razorpayPaymentId}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            /> */}

            {/* Submit button */}
            <div className="col-span-1 md:col-span-3 mt-6 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
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
              <a href="/"
               
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
              Back to Signin
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerRegistration;
