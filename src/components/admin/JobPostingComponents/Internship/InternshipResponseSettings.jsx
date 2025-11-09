import React, { useEffect, useState } from "react";
import { Calendar, UserPlus, Mail, ChevronDown } from "lucide-react";

const JobResponseSettings = ({ setResponseSettings, onPost }) => {
  const [date, setDate] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [showSummaryDropdown, setShowSummaryDropdown] = useState(false);

  useEffect(() => {
    setResponseSettings({ date, referenceCode });
  }, [date, referenceCode]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 space-y-6">
      {/* Last date to apply */}
      <div>
        <label className="text-gray-800 font-medium">
          Last date to apply{" "}
          <span className="text-gray-500 font-normal">(Optional)</span>
        </label>
        <div className="mt-2 relative">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Select date"
          />
          <Calendar className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Collaborate with team */}
      <div>
        <p className="text-gray-800 font-medium">
          Collaborate with team members to manage responses
        </p>
        <div className="mt-3 border border-gray-300 rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md w-fit">
         
       
          </div>
          <button className="flex items-center text-blue-600 text-sm font-medium hover:underline">
            <UserPlus className="w-4 h-4 mr-1" /> Add members
          </button>
        </div>
      </div>

      {/* Receive responses */}
      <div>
        <div className="flex items-center justify-between">
          <p className="text-gray-800 font-medium">Receive responses over email</p>
          <button
            onClick={() => setShowSummaryDropdown(!showSummaryDropdown)}
            className="text-blue-600 text-sm font-medium flex items-center"
          >
            As a daily summary
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>

        {showSummaryDropdown && (
          <div className="mt-2 border border-gray-300 rounded-md shadow-sm w-48 bg-white">
            <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
              As a daily summary
            </button>
            <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
              On every new response
            </button>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-gray-50">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-700">
              pragati.panchal@cars24.com will receive responses
            </p>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Edit
          </button>
        </div>
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

      {/* Action Buttons */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => onPost("draft")}
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50"
        >
          Save as Preview
        </button>

        <button
          onClick={() => onPost("active")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Post an internship
        </button>
      </div>
    </div>
  );
};

export default JobResponseSettings;
