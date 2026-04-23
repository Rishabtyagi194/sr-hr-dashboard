import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RecruiterProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get email & role ONLY from params
  const params = new URLSearchParams(location.search);

  const email = params.get("email") || "";
  const role = params.get("role") || "";

  const [profile, setProfile] = useState({
    name: "",
    company: "",
    industry: "",
    phone: "",
    location: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // ✅ Redirect if params missing
  useEffect(() => {
    if (!email || !role) {
      navigate("/home"); // or login
    }
  }, [email, role, navigate]);

  // ✅ Load other profile data from localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || {};

    setProfile({
      name: savedProfile.name || "",
      company: savedProfile.company || "",
      industry: savedProfile.industry || "",
      phone: savedProfile.phone || "",
      location: savedProfile.location || "",
    });
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Save
  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Recruiter Profile
            </h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Info */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Personal */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-medium mb-3">Personal Info</h3>

            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter name"
              disabled={!isEditing}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              value={email}
              disabled
              className="w-full mb-2 p-2 border rounded bg-gray-100"
            />

            <input
              value={role}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Company */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-medium mb-3">Company</h3>

            <input
              name="company"
              value={profile.company}
              onChange={handleChange}
              placeholder="Company name"
              disabled={!isEditing}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              name="industry"
              value={profile.industry}
              onChange={handleChange}
              placeholder="Industry"
              disabled={!isEditing}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Location"
              disabled={!isEditing}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Contact */}
          <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
            <h3 className="text-lg font-medium mb-3">Contact</h3>

            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone"
              disabled={!isEditing}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
