import React, { useState } from "react";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

export default function DiversityAndAdditionalDetails({ filters, setFilters }) {
  const [open, setOpen] = useState(true);

  const onlyNumbers = (value) => value.replace(/[^0-9]/g, "");

  const genders = [
    { label: "All candidates", value: "" },
    { label: "Male candidates", value: "Male" },
    { label: "Female candidates", value: "Female" },
  ];

  return (
    <div className="w-full p-6 border border-gray-200 rounded-xl bg-white shadow-sm space-y-4">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Diversity and Additional Details
        </h2>
        {open ? <IoChevronUp size={22} /> : <IoChevronDown size={22} />}
      </div>

      {open && (
        <div className="space-y-6">
          <p className="text-gray-700 font-medium">Diversity details</p>

          {/* Gender */}
          <div className="space-y-2">
            <p className="text-gray-600 font-medium">Gender</p>
            <div className="flex flex-wrap gap-2">
              {genders.map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    setFilters({ ...filters, gender: item.value })
                  }
                  className={`px-4 py-2 rounded-full border text-sm ${
                    filters.gender === item.value
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* PWD */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={filters.pwdOnly}
              onChange={(e) =>
                setFilters({ ...filters, pwdOnly: e.target.checked })
              }
            />
            Person with Disabilities only
          </label>

          {/* Candidate Category */}
          <div className="space-y-1">
            <label className="text-gray-600 font-medium">
              Candidate Category
            </label>
            <input
              type="text"
              value={filters.candidateCategory}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  candidateCategory: e.target.value,
                })
              }
              placeholder="Add candidate category"
              className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Candidate Age */}
          <div className="space-y-1">
            <label className="text-gray-600 font-medium">Candidate Age</label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={filters.minAge}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minAge: onlyNumbers(e.target.value),
                  })
                }
                placeholder="Min age"
                className="border border-gray-300 rounded-md px-3 py-2 w-32"
              />

              <span className="text-gray-600">to</span>

              <input
                type="text"
                value={filters.maxAge}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxAge: onlyNumbers(e.target.value),
                  })
                }
                placeholder="Max age"
                className="border border-gray-300 rounded-md px-3 py-2 w-32"
              />

              <span className="text-gray-600">Years</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
