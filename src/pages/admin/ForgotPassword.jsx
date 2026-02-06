import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address";
    return "";
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://qa.api.rozgardwar.cloud/api/employer/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Password reset link sent to your email");
      setEmail("");

      // optional redirect
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex w-full max-w-5xl">
          {/* Left Side */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-xl font-bold text-[#0078db] mb-6">
              Rozgar Dwar
            </h2>
            <h3 className="text-2xl font-semibold mb-2">
              Forgot Password
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Enter your registered email and we’ll send you a reset link.
            </p>

            <form className="space-y-4" onSubmit={handleForgotPassword}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078db]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#0078db] text-white py-2 rounded-lg transition flex items-center justify-center ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#005fa8]"
                }`}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="text-center mt-4">
                <span
                  onClick={() => navigate("/")}
                  className="text-sm text-[#0078db] cursor-pointer hover:underline"
                >
                  Back to Login
                </span>
              </div>
            </form>
          </div>

          {/* Right Side Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
              alt="Forgot password"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
