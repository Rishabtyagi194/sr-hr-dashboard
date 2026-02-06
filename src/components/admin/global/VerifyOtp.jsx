"use client";

import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RESEND_TIME = 30;
const MAX_ATTEMPTS = 3;

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIME);

  const [attempts, setAttempts] = useState(() => {
    return Number(sessionStorage.getItem("otpAttempts")) || 0;
  });

  // ✅ Read from sessionStorage
  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role") || "employer_admin";

  const registrationData = JSON.parse(
    sessionStorage.getItem("employerRegistration") || "{}"
  );

  const { employerName, employerPhone } = registrationData;

  // ⏱ Timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    sessionStorage.setItem("otpAttempts", attempts);
  }, [attempts]);

  const handleVerify = async () => {
    if (attempts >= MAX_ATTEMPTS) {
      setError("OTP attempt limit reached. Please resend OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter 6 digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://qa.api.rozgardwar.cloud/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAttempts((prev) => prev + 1);
        throw new Error(data.message || "Invalid OTP");
      }

      // 🔐 Auto-login
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", employerName);
      localStorage.setItem("userPhone", employerPhone);

      setSuccess(true);

      sessionStorage.clear();

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");

    try {
      const res = await fetch("https://qa.api.rozgardwar.cloud/otp/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setAttempts(0);
      setTimer(RESEND_TIME);
      setOtp("");
      sessionStorage.removeItem("otpAttempts");
    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-center">Verify OTP</CardTitle>
        </CardHeader>

        {/* ✅ USER DETAILS ALWAYS SHOWN (BEFORE SUCCESS) */}
        <div className="mt-3 px-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              value={employerName || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={employerPhone || "No Phone Number"}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Role
            </label>
            <input
              type="text"
              value={role || "No Role Assigned"}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>

        <CardContent className="space-y-6  ">
          <div className="flex justify-center items-center gap-20">
            {/* <CardTitle className="text-center">Verify OTP</CardTitle> */}
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(val) => {
                setOtp(val);
                if (error) setError("");
              }}
              disabled={attempts >= MAX_ATTEMPTS}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <p className="text-xs text-center text-gray-500">
            Attempts left: {MAX_ATTEMPTS - attempts}
          </p>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={loading || attempts >= MAX_ATTEMPTS}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          {success && (
            <p className="text-green-600 text-center font-medium">
              ✅ OTP verified successfully. Redirecting…
            </p>
          )}

          {!success && (
            <div className="text-center text-sm text-gray-600">
              {timer > 0 ? (
                <p>Resend OTP in {timer}s</p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  disabled={resendLoading}
                  className="text-blue-600 hover:underline disabled:opacity-50"
                >
                  {resendLoading ? "Resending..." : "Resend OTP"}
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
