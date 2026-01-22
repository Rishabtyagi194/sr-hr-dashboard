import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

const JobResponseSettings = ({ setResponseSettings, onPost, isFormValid }) => {
  const [date, setDate] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [isConsultantVisible, setIsConsultantVisible] = useState(false);
  const [aboutCompany, setAboutCompany] = useState(""); // ✅ NEW
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setResponseSettings({
      date,
      referenceCode,
      isConsultantVisible,
      aboutCompany, // ✅ NEW
    });
  }, [date, referenceCode, isConsultantVisible, aboutCompany]);

  const hasDateError = touched && !date;
  const hasAboutCompanyError = touched && !aboutCompany.trim();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 space-y-6">
      {/* Last date to apply */}
      <div>
      
     {/* Last date to apply */}
<div>
  <label className="text-gray-800 font-medium">
    Last date to apply <span className="text-red-500">*</span>
  </label>

  <div className="mt-2 relative">
    <input
      type="date"
      min={new Date().toISOString().split("T")[0]} // ✅ prevent past dates
      value={date}
      onChange={(e) => setDate(e.target.value)}
      onBlur={() => setTouched(true)}
      className={`w-full rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1
        ${
          touched && !date
            ? "border border-red-500 focus:ring-red-500"
            : "border border-gray-300 focus:ring-blue-500"
        }`}
    />
  </div>


</div>


        {hasDateError && (
          <p className="text-xs text-red-500 mt-1">
            Last date to apply is required
          </p>
        )}
      </div>

      {/* About Company – ✅ NEW FIELD */}
      <div>
        <label className="text-gray-800 font-medium">
          About Company <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Enter company description..."
          value={aboutCompany}
          onChange={(e) => setAboutCompany(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`w-full mt-2 rounded-lg p-2.5 text-gray-700 resize-none focus:outline-none focus:ring-1
            ${
              hasAboutCompanyError
                ? "border border-red-500 focus:ring-red-500"
                : "border border-gray-300 focus:ring-blue-500"
            }`}
        />

        {hasAboutCompanyError && (
          <p className="text-xs text-red-500 mt-1">
            About company is required
          </p>
        )}
      </div>

      {/* Reference Code */}
      <div>
        <label className="text-gray-800 font-medium">
          Add reference code to distinctly identify this internship{" "}
          <span className="text-gray-500 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          placeholder="Enter reference code"
          value={referenceCode}
          onChange={(e) => setReferenceCode(e.target.value)}
          className="w-full mt-2 border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Vacancy visible to consultancy */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={isConsultantVisible}
          onChange={(e) => setIsConsultantVisible(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm text-gray-700">
          Vacancy should be visible to consultancy?
        </span>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-2">
        <button
          disabled={!isFormValid}
          onClick={() => onPost("draft")}
          className={`px-6 py-2 rounded-lg transition
            ${
              isFormValid
                ? "border border-blue-600 text-blue-600 hover:bg-blue-50"
                : "border border-gray-300 text-gray-400 cursor-not-allowed"
            }`}
        >
          Save as Preview
        </button>

        <button
          disabled={!isFormValid}
          onClick={() => onPost("active")}
          className={`px-6 py-2 rounded-lg transition
            ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
        >
          Post an internship
        </button>
      </div>
    </div>
  );
};

export default JobResponseSettings;
