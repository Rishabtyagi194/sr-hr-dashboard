import React, { useState, useEffect, useMemo } from "react";

const STATUS_TABS = [
  { key: "ALL", label: "All responses" },
  { key: "SHORTLISTED", label: "Shortlisted" },
  { key: "MAYBE", label: "Maybe" },
  { key: "REJECTED", label: "Rejected" },
];

export const UplodedResume = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // ✅ Get token safely
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No auth token found");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "http://147.93.72.227:5000/api/jobs/all-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        const applications =
          data?.jobs?.flatMap((job) => job.applications || []) || [];

        setCandidates(applications);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
            className={`pb-2 font-medium ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
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
                <p className="font-semibold">{item.full_name}</p>

                <p className="text-sm text-gray-600">
                  <b>Profile:</b> {profile.profile_title || "N/A"}
                </p>

                <p className="text-sm text-gray-600">
                  <b>Experience:</b>{" "}
                  {item.total_experience_years || 0}y{" "}
                  {item.total_experience_months || 0}m
                </p>

                <p className="text-sm text-gray-600">
                  <b>Skills:</b>{" "}
                  {Array.isArray(profile.skills)
                    ? profile.skills
                        .map((s) => s.skill_name)
                        .join(", ")
                    : "N/A"}
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-2">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
                  {item.application_status}
                </span>

                <button className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm">
                  Shortlist
                </button>

                <button className="border border-gray-400 text-gray-600 px-3 py-1 rounded-full text-sm">
                  Maybe
                </button>

                <button className="border border-red-500 text-red-500 px-3 py-1 rounded-full text-sm">
                  Reject
                </button>
              </div>
            </div>
          );
        })}

        {filteredCandidates.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No {activeTab.toLowerCase()} found
          </p>
        )}
      </div>
    </div>
  );
};
