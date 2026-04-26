import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const RESEND_TIME = 30;
const MAX_ATTEMPTS = 3;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // from query params
  const params = new URLSearchParams(location.search);

  const email = params.get("email");
  const role = params.get("role");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [timer, setTimer] = useState(RESEND_TIME);
  const [attempts, setAttempts] = useState(0);

  // invalid link guard
  useEffect(() => {
    if (!email || !role) {
      setError("Invalid or expired verification link.");
    }
  }, [email, role]);

  // countdown
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
      setError("Please enter valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:9000/otp/verify-otp?email=${encodeURIComponent(
          email
        )}&role=${encodeURIComponent(role)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setAttempts((prev) => prev + 1);
        throw new Error(data.message || "OTP verification failed");
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/home");
      }, 2000);

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
        "http://localhost:9000/otp/resend-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            role,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to resend OTP"
        );
      }

      setOtp("");
      setAttempts(0);
      setTimer(RESEND_TIME);

    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-6">
          <span className="text-4xl">🔐</span>
        </div>

        <h1 className="text-3xl font-bold text-center mb-3">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-8 leading-7">
          Enter the 6-digit OTP sent to
          <br />
          <span className="font-semibold text-black">
            {email}
          </span>
        </p>


        {/* OTP INPUT */}
        <div className="flex justify-center mb-6">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              if (error) setError("");
            }}
            disabled={success}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0}/>
              <InputOTPSlot index={1}/>
              <InputOTPSlot index={2}/>
              <InputOTPSlot index={3}/>
              <InputOTPSlot index={4}/>
              <InputOTPSlot index={5}/>
            </InputOTPGroup>
          </InputOTP>
        </div>


        <p className="text-center text-xs text-gray-500 mb-3">
          Attempts left: {MAX_ATTEMPTS - attempts}
        </p>


        {error && (
          <p className="text-red-500 text-center text-sm mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-center mb-4 font-medium">
            Email verified successfully. Redirecting...
          </p>
        )}


        <button
          onClick={handleVerify}
          disabled={
            loading ||
            success ||
            attempts >= MAX_ATTEMPTS
          }
          className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>


        {/* RESEND */}
        {!success && (
          <div className="text-center mt-6">
            {timer > 0 ? (
              <p className="text-gray-500">
                Resend OTP in{" "}
                <span className="font-semibold">
                  {timer}s
                </span>
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="text-blue-600 font-semibold hover:underline"
              >
                {resendLoading
                  ? "Resending..."
                  : "Resend OTP"}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifyOtp;