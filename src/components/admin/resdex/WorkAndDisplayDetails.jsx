import React from "react";

export default function WorkAndDisplayDetails({ filters, setFilters }) {
  const showOptions = [
    "All candidates",
    "New registrations",
    "Modified candidates",
  ];

  const filterOptions = [
    { label: "Verified mobile number", key: "verifiedMobile" },
    { label: "Verified email ID", key: "verifiedEmail" },
    { label: "Attached resume", key: "attachedResume" },
  ];

  return (
    <div className="w-full p-6 border border-gray-200 rounded-xl bg-white shadow-sm space-y-6">
      {/* WORK DETAILS */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Work details</h2>

        {/* Job / Employment */}
        <div className="space-y-2">
          <p className="text-gray-600 font-medium">Show candidates seeking</p>

          <div className="flex gap-3">
            <select
              value={filters.jobType}
              onChange={(e) =>
                setFilters({ ...filters, jobType: e.target.value })
              }
              className="w-56 border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Job type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            <select
              value={filters.employmentType}
              onChange={(e) =>
                setFilters({ ...filters, employmentType: e.target.value })
              }
              className="w-56 border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Employment type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
        </div>

        {/* Work permit */}
        <div className="space-y-1">
          <p className="text-gray-600 font-medium">Work permit for</p>
          <select
            value={filters.workPermit}
            onChange={(e) =>
              setFilters({ ...filters, workPermit: e.target.value })
            }
            className="w-56 border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">Choose category</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Other">Other</option>
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
                onClick={() =>
                  setFilters({ ...filters, showCandidates: item })
                }
                className={`px-4 py-2 rounded-full border text-sm ${
                  filters.showCandidates === item
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
            {filterOptions.map(({ label, key }) => (
              <button
                key={label}
                onClick={() =>
                  setFilters({
                    ...filters,
                    [key]: !filters[key],
                  })
                }
                className={`px-4 py-2 rounded-full border text-sm ${
                  filters[key]
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
