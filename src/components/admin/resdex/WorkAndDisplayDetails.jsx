import React, { useState } from "react";

export default function WorkAndDisplayDetails() {
  const [showType, setShowType] = useState("All candidates");
  const [filters, setFilters] = useState([]);

  const showOptions = [
    "All candidates",
    "New registrations",
    "Modified candidates",
  ];

  const filterOptions = [
    "Verified mobile number",
    "Verified email ID",
    "Attached resume",
  ];

  const toggleFilter = (item) => {
    setFilters((prev) =>
      prev.includes(item)
        ? prev.filter((f) => f !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="w-full p-6 border border-gray-200 rounded-xl bg-white shadow-sm space-y-6">
      {/* WORK DETAILS */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Work details</h2>

        {/* Show candidates seeking */}
        <div className="space-y-2">
          <p className="text-gray-600 font-medium">Show candidates seeking</p>

          <div className="flex gap-3">
            <select className="w-56 border border-gray-300 rounded-lg px-3 py-2 outline-none">
              <option>Job type</option>
              <option>Permanent</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>

            <select className="w-56 border border-gray-300 rounded-lg px-3 py-2 outline-none">
              <option>Employment type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Freelance</option>
            </select>
          </div>
        </div>

        {/* Work permit */}
        <div className="space-y-1">
          <p className="text-gray-600 font-medium">Work permit for</p>
          <select className="w-56 border border-gray-300 rounded-lg px-3 py-2 outline-none">
            <option>Choose category</option>
            <option>India</option>
            <option>USA</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* DISPLAY DETAILS */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Display details</h2>

        {/* Show */}
        <div className="space-y-2">
          <p className="text-gray-600 font-medium">Show</p>
          <div className="flex flex-wrap gap-2">
            {showOptions.map((item) => (
              <button
                key={item}
                onClick={() => setShowType(item)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  showType === item
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Show only candidates with */}
        <div className="space-y-2">
          <p className="text-gray-600 font-medium">
            Show only candidates with
          </p>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((item) => (
              <button
                key={item}
                onClick={() => toggleFilter(item)}
                className={`px-4 py-2 rounded-full border text-sm flex items-center gap-1 ${
                  filters.includes(item)
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {item}
                <span className="text-lg">+</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
