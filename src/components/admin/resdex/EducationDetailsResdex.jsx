import React, { useState } from "react";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

export default function EducationDetailsResdex() {
  const [open, setOpen] = useState(true);

  const [ug, setUg] = useState("Any UG qualification");
  const [pg, setPg] = useState("Any PG qualification");

  const [educationTypeUG, setEducationTypeUG] = useState("Full Time");
  const [educationTypePG, setEducationTypePG] = useState("Full Time");

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
        <div className="space-y-8">
          {/* ================= UG ================= */}
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

          {ug === "Specific UG qualification" && (
            <div className="space-y-4 border-t pt-4">
              <Input label="Choose Course" placeholder="Type or select UG course" />
              <Input label="Institute" placeholder="Select institute" />

              <EducationType
                value={educationTypeUG}
                onChange={setEducationTypeUG}
              />

              <YearRange />
            </div>
          )}

          {/* ================= PG ================= */}
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

          {pg === "Specific PG qualification" && (
            <div className="space-y-4 border-t pt-4">
              <Input label="Choose PG Course" placeholder="Type or select PG course" />
              <Input label="Institute" placeholder="Select institute" />

              <EducationType
                value={educationTypePG}
                onChange={setEducationTypePG}
              />

              <YearRange />
            </div>
          )}

          {/* Doctorate */}
          {/* <p className="text-blue-600 font-medium cursor-pointer">
            + Add PPG/Doctorate Qualification
          </p> */}
        </div>
      )}
    </div>
  );
}

/* ================= Reusable Components ================= */

const Input = ({ label, placeholder }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const EducationType = ({ value, onChange }) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-700">Education Type</p>
    <div className="flex gap-2">
      {["Full Time", "Part Time", "Correspondence"].map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-4 py-2 rounded-full border text-sm ${
            value === type
              ? "bg-blue-50 border-blue-500 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  </div>
);

const YearRange = () => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="text-sm font-medium text-gray-700">From</label>
      <select className="mt-1 w-full border rounded-lg px-3 py-2 text-sm">
        <option>From</option>
        <option>2019</option>
        <option>2020</option>
        <option>2021</option>
      </select>
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700">To</label>
      <select className="mt-1 w-full border rounded-lg px-3 py-2 text-sm">
        <option>To</option>
        <option>2023</option>
        <option>2024</option>
        <option>2025</option>
      </select>
    </div>
  </div>
);
