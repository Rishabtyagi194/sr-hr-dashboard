import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RESEND_TIME = 30;
const MAX_ATTEMPTS = 3;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get from query params FIRST, fallback to localStorage
  const params = new URLSearchParams(location.search);

  const email =
    params.get("email") ||
    localStorage.getItem("email") ||
    "";

  const role =
    params.get("role") ||
    localStorage.getItem("role") ||
    "employer_admin";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIME);
  const [attempts, setAttempts] = useState(0);

  // ✅ Redirect if email missing
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // ⏱ Timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ---------------- VERIFY OTP ----------------
  const handleVerify = async () => {
    if (!email || !role) return;

    if (attempts >= MAX_ATTEMPTS) {
      setError("OTP attempt limit reached. Please resend OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://qa.api.rozgardwar.cloud/otp/verify-otp?email=${encodeURIComponent(
          email
        )}&role=${encodeURIComponent(role)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: Number(otp) }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setAttempts((prev) => prev + 1);
        throw new Error(data.message || "OTP verification failed.");
      }

      // ✅ Save auth data
      localStorage.setItem("token", data.token || "");
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("isLoggedIn", "true");

      setSuccess(true);

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RESEND OTP ----------------
  const handleResendOtp = async () => {
    if (!email || !role) return;

    setResendLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/otp/resend-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, role }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setAttempts(0);
      setTimer(RESEND_TIME);
      setOtp("");
    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <h2 className="text-2xl font-semibold text-center text-[#0078db] mb-2">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 6-digit OTP sent to <b>{email}</b>
        </p>

        {/* OTP Input */}
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, ""));
            if (error) setError("");
          }}
          className="text-center tracking-[10px] text-lg border rounded-lg px-4 py-3 w-full mb-3 focus:ring-2 focus:ring-[#0078db] outline-none"
          placeholder="______"
        />

        {/* Attempts */}
        <p className="text-xs text-gray-500 text-center mb-2">
          Attempts left: {MAX_ATTEMPTS - attempts}
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || attempts >= MAX_ATTEMPTS}
          className={`w-full bg-[#0078db] text-white py-2 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#005fa8]"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Success */}
        {success && (
          <p className="text-green-600 text-center font-medium mt-4">
            ✅ OTP verified successfully. Redirecting...
          </p>
        )}

        {/* Resend */}
        {!success && (
          <div className="text-center text-sm text-gray-600 mt-4">
            {timer > 0 ? (
              <p>Resend OTP in {timer}s</p>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="text-[#0078db] hover:underline disabled:opacity-50"
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;