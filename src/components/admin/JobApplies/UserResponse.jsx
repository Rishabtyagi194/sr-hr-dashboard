import React, { useState, useMemo } from "react";

const STATUS_TABS = [
  { key: "ALL", label: "All responses" },
  { key: "SHORTLISTED", label: "Shortlisted" },
  { key: "MAYBE", label: "Maybe" },
  { key: "REJECTED", label: "Rejected" },
];

export const UserResponse = ({ candidates, loading }) => {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredCandidates = useMemo(() => {
    if (activeTab === "ALL") return candidates;

    return candidates.filter(
      (item) =>
        item.application_status?.toUpperCase() === activeTab
    );
  }, [candidates, activeTab]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex-1 p-6">
      {/* TOP TABS */}
      <div className="flex gap-6 border-b mb-4">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 font-medium transition ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTION BAR */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <input type="checkbox" />
        <span>Select all</span>
        <span className="cursor-pointer">Shortlist</span>
        <span className="cursor-pointer">Reject</span>
        <span className="cursor-pointer">Email</span>
        <span className="cursor-pointer">Download</span>
        <span className="cursor-pointer">Delete</span>
      </div>

      {/* CANDIDATE LIST */}
      <div className="space-y-4">
        {filteredCandidates.map((item) => {
          const profile = item.profile || {};

          return (
            <div
              key={item.application_id}
              className="bg-white rounded-lg border p-4 flex justify-between"
            >
              {/* LEFT */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <input type="checkbox" />
                  <p className="font-semibold">{item.full_name}</p>
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Profile:</span>{" "}
                  {profile.profile_title || "N/A"}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span>{" "}
                  {item.total_experience_years}y{" "}
                  {item.total_experience_months}m
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span>{" "}
                  {item.hometown}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Skills:</span>{" "}
                  {profile.skills?.map((s) => s.skill_name).join(", ") || "N/A"}
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-2">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
                  {item.application_status}
                </span>

                <button className="px-4 py-1 rounded-full border border-green-600 text-green-600 text-sm">
                  Shortlist
                </button>

                <button className="px-4 py-1 rounded-full border border-gray-400 text-gray-600 text-sm">
                  Maybe
                </button>

                <button className="px-4 py-1 rounded-full border border-red-500 text-red-500 text-sm">
                  Reject
                </button>

                <p className="text-xs text-gray-400 mt-2">
                  Applied on:{" "}
                  {new Date(item.applied_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}

        {filteredCandidates.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No{" "}
            {activeTab === "ALL"
              ? "responses"
              : activeTab.toLowerCase()}{" "}
            found
          </p>
        )}
      </div>
    </div>
  );
};
