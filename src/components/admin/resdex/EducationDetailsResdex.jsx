import React, { useState } from "react";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

export default function EducationDetailsResdex() {
  const [open, setOpen] = useState(true);

  const [ug, setUg] = useState("Any UG qualification");
  const [pg, setPg] = useState("Any PG qualification");

  const ugOptions = [
    "Any UG qualification",
    "Specific UG qualification",
    "No UG qualification",
  ];

  const pgOptions = [
    "Any PG qualification",
    "Specific PG qualification",
    "No PG qualification",
  ];

  const Pill = ({ active, label, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm transition ${
        active
          ? "bg-blue-50 border-blue-500 text-blue-700"
          : "border-gray-300 text-gray-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full p-6 border border-gray-200 rounded-xl bg-white shadow-sm space-y-4">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Education Details
        </h2>
        {open ? <IoChevronUp size={22} /> : <IoChevronDown size={22} />}
      </div>

      {open && (
        <div className="space-y-6">
          {/* UG Qualification */}
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">UG Qualification</p>
            <div className="flex flex-wrap gap-2">
              {ugOptions.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  active={ug === item}
                  onClick={() => setUg(item)}
                />
              ))}
            </div>
          </div>

          {/* PG Qualification */}
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">PG Qualification</p>
            <div className="flex flex-wrap gap-2">
              {pgOptions.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  active={pg === item}
                  onClick={() => setPg(item)}
                />
              ))}
            </div>
          </div>

          {/* Add Doctorate */}
          <p className="text-blue-600 font-medium cursor-pointer">
            + Add PPG/Doctorate Qualification
          </p>
        </div>
      )}
    </div>
  );
}
