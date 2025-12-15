import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ExperienceFilter() {
  const [showITSkills, setShowITSkills] = useState(false);

  const onlyNumbers = (value) => value.replace(/[^0-9]/g, "");

  return (
    <div className="w-full space-y-6 p-6">

      {/* -------- TOP LINKS -------- */}
      <p className="text-blue-600 font-medium cursor-pointer">+ Add Exclude Keywords</p>

      <p
        className="text-blue-600 font-medium cursor-pointer"
        onClick={() => setShowITSkills(true)}
      >
        + Add IT Skills
      </p>

      {/* -------- IT SKILLS SECTION -------- */}
      {showITSkills && (
        <div className="space-y-3 border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
          <p className="text-gray-800 font-semibold">IT Skills</p>

          <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm leading-5 border border-blue-100 flex gap-2">
            <span className="text-base">ℹ️</span>
            <p>
              Candidates often miss filling the IT skills section in their profiles.
              Searching for them based on IT skills might lead to limited search results.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Add IT skill"
              className="border border-gray-300 rounded-lg px-3 py-2 w-48 outline-none text-sm"
            />

            <input
              type="text"
              placeholder="Add experience"
              className="border border-gray-300 rounded-lg px-3 py-2 w-48 outline-none text-sm"
              onChange={(e) => (e.target.value = onlyNumbers(e.target.value))}
            />

            <button
              onClick={() => setShowITSkills(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>
      )}

      {/* -------- CURRENT LOCATION OF CANDIDATE -------- */}
      <div className="space-y-3">
        <p className="text-gray-700 font-semibold">Current location of candidate</p>

        {/* Location Tag + Input */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full border border-gray-300 text-sm flex items-center gap-2">
            Gurugram
            <IoClose size={16} className="cursor-pointer" />
          </span>

          <input
            type="text"
            placeholder="Add location"
            className="outline-none text-sm flex-1"
          />
        </div>

        {/* Checkboxes */}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="w-4 h-4" defaultChecked />
          Include candidates who prefer to relocate to above locations
          <span className="text-blue-600 cursor-pointer">Change preferred location</span>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="w-4 h-4" />
          Exclude candidates who have mentioned Anywhere in…
        </label>

        {/* Info box */}
        <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-100 flex gap-2">
          <span className="text-base">ℹ️</span>
          <p>
            You will get candidates who are either currently in <b>OR</b> prefer to
            relocate to Gurugram.
          </p>
        </div>
      </div>

      {/* -------- ANNUAL SALARY -------- */}
      <div className="space-y-3">
        <p className="text-gray-700 font-semibold">Annual Salary</p>

        <div className="flex items-center gap-3">
          {/* Currency Dropdown */}
          <select className="border border-gray-300 rounded-md px-3 py-2 outline-none">
            <option>INR</option>
          </select>

          {/* Min salary */}
          <input
            type="text"
            placeholder="50"
            className="border border-gray-300 rounded-md px-3 py-2 w-40 outline-none"
            onChange={(e) => (e.target.value = onlyNumbers(e.target.value))}
          />

          <span className="text-gray-600">to</span>

          {/* Max salary */}
          <input
            type="text"
            placeholder="Max salary"
            className="border border-gray-300 rounded-md px-3 py-2 w-40 outline-none"
            onChange={(e) => (e.target.value = onlyNumbers(e.target.value))}
          />

          <span className="text-gray-600">Lacs</span>
        </div>

        {/* Salary checkbox */}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="w-4 h-4" />
          Include candidates who did not mention their current salary
        </label>
      </div>
    </div>
  );
}
