import React, { useState } from "react";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

export default function EmploymentDetails({ filters, setFilters }) {
  const [open, setOpen] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState("Any");

  const noticeOptions = [
    "Any",
    "0 - 15 days",
    "1 month",
    "2 months",
    "3 months",
    "More than 3 months",
    "Currently serving notice period",
  ];

  /* ---------- TOGGLE BOOLEAN ---------- */
  const toggleBoolean = () => {
    setFilters({
      ...filters,
      designationBoolean: filters.designationBoolean === "OR" ? "AND" : "OR",
    });
  };

  /* ---------- NOTICE PERIOD ---------- */
  const handleNoticeClick = (option) => {
    setSelectedNotice(option);

    setFilters({
      ...filters,
      noticePeriod: option === "Any" ? [] : [option],
    });
  };

  return (
    <div className="w-full p-6 border border-gray-200 rounded-xl bg-white shadow-sm space-y-4">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Employment Details
        </h2>
        {open ? <IoChevronUp size={22} /> : <IoChevronDown size={22} />}
      </div>

      {open && (
        <div className="space-y-6">
          {/* Department */}
          <div>
            <label className="text-gray-600 font-medium">
              Department and Role
            </label>
            <input
              type="text"
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
              placeholder="Add Department/Role"
              className="mt-1 w-full border rounded-lg px-3 py-3"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="text-gray-600 font-medium">Industry</label>
            <input
              type="text"
              value={filters.industry}
              onChange={(e) =>
                setFilters({ ...filters, industry: e.target.value })
              }
              placeholder="Add industry"
              className="mt-1 w-full border rounded-lg px-3 py-3"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-gray-600 font-medium">Company</label>
            <input
              type="text"
              value={filters.company}
              onChange={(e) =>
                setFilters({ ...filters, company: e.target.value })
              }
              placeholder="Add company name"
              className="mt-1 w-full border rounded-lg px-3 py-3"
            />
          </div>

          {/* Designation */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-medium">Designation</label>

              {/* Boolean Toggle */}
              {/* <div
                onClick={toggleBoolean}
                className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                  filters.designationBoolean === "AND"
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full transition-all ${
                    filters.designationBoolean === "AND"
                      ? "translate-x-6"
                      : ""
                  }`}
                />
              </div> */}
            </div>

            <input
              type="text"
              value={filters.designation}
              onChange={(e) =>
                setFilters({ ...filters, designation: e.target.value })
              }
              placeholder="Add designation"
              className="mt-1 w-full border rounded-lg px-3 py-3"
            />
{/* 
            <p className="text-sm text-gray-600 mt-1">
              Boolean:
              <span className="font-medium ml-1">
                {filters.designationBoolean}
              </span>
            </p> */}
          </div>

          {/* Notice Period */}
          <div>
            <label className="text-gray-700 font-semibold">
              Notice Period / Availability to join
            </label>

            <div className="flex flex-wrap gap-2 mt-3">
              {noticeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleNoticeClick(option)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    selectedNotice === option
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
