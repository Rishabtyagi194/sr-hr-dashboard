import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_TABS = [
  { key: "ALL", label: "All responses" },
  { key: "APPLIED", label: "Applied" },
  { key: "SHORTLISTED", label: "Shortlisted" },
  { key: "MAYBE", label: "Maybe" },
  { key: "REJECTED", label: "Rejected" },
  { key: "VIEWED", label: "Profile View" },
  { key: "interview_scheduled", label: "Interview Scheduled" },
  { key: "HIRED", label: "Hired" },
];

// ✅ ADDITION (nothing removed)
const STATUS_ACTIONS = [
  {
    label: "Viewed",
    value: "viewed",
    color: "border-indigo-500 text-indigo-500",
  },
  {
    label: "Shortlist",
    value: "shortlisted",
    color: "border-green-600 text-green-600",
  },
  { label: "Maybe", value: "maybe", color: "border-gray-400 text-gray-600" },
  {
    label: "Interview",
    value: "interview_scheduled",
    color: "border-purple-600 text-purple-600",
  },
  {
    label: "Hired",
    value: "hired",
    color: "border-emerald-600 text-emerald-600",
  },
  { label: "Reject", value: "rejected", color: "border-red-500 text-red-500" },
];

export const UplodedResume = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Track loading per resume
  const [updatingResumeId, setUpdatingResumeId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          "https://qa.api.rozgardwar.cloud/api/jobs/applications/consultant/all/submitted-resume",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setApplications(data?.applications || []);
      } catch (error) {
        console.error("Fetch error", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /** 🔹 Flatten resumes */
  const resumeList = useMemo(() => {
    return applications.flatMap((app) =>
      (app.resumes || []).map((resume) => ({
        ...resume,
        application_id: app.application_id,
        job_ref_id: app.job_ref_id,
        job_category: app.job_category,
        consultant_name: app.posted_by_consultant,
        consultant_email: app.posted_by_consultant_email,
        applied_at: app.applied_at,
      }))
    );
  }, [applications]);

  // ✅ SMALL SAFE ADDITION (no removal)
  const filteredResumes = useMemo(() => {
    if (activeTab === "ALL") return resumeList;

    return resumeList.filter(
      (r) => r.status?.toLowerCase() === activeTab.toLowerCase()
    );
  }, [resumeList, activeTab]);

  // 🔹 STATUS UPDATE HANDLER (unchanged)
  const updateResumeStatus = async (application_id, resume_id, status) => {
    try {
      setUpdatingResumeId(resume_id);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/consultant/resume/status",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            application_id,
            resume_id,
            status,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update failed");
      }

      // ✅ Optimistic UI update (unchanged)
      setApplications((prev) =>
        prev.map((app) =>
          app.application_id === application_id
            ? {
                ...app,
                resumes: app.resumes.map((r) =>
                  r.resume_id === resume_id ? { ...r, status } : r
                ),
              }
            : app
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setUpdatingResumeId(null);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex-1 p-6">
      {/* 🔹 TABS */}
      <div className="flex gap-6 border-b mb-6">
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

      {/* 🔹 RESUME CARDS */}
      <div className="space-y-4">
        {filteredResumes.map((item) => {
          const isUpdating = updatingResumeId === item.resume_id;

          return (
            <div
              key={item.resume_id}
              className="bg-white rounded-lg border p-4 flex justify-between"
            >
              {/* LEFT */}
              <div className="space-y-1">
              <p
                  onClick={() => navigate(`/jobposting/${item.job_ref_id}`)}
                  className="text-lg cursor-pointer text-blue-600 hover:underline"
                >
                  <b>Job Ref:</b> {item.job_ref_id} ({item.job_category})
                </p>
                {/* <p className="font-semibold">{item.resume_title}</p> */}

                <p className="text-sm text-gray-600">
                  <b>Application ID:</b> {item.application_id}
                </p>

             
                <p className="text-sm text-gray-600">
                  <b>Consultant:</b> {item.consultant_name}
                </p>

                <p className="text-sm text-gray-600">
                  <b>Email:</b> {item.consultant_email}
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-2">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-xs uppercase">
                  {item.status}
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-blue-600 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  View Resume
                </a>

                {/* ✅ ALL STATUS BUTTONS (added, nothing removed) */}
                <div className="flex flex-wrap gap-2 justify-end">
                  {STATUS_ACTIONS.map((action) => (
                    <button
                      key={action.value}
                      disabled={isUpdating || item.status === action.value}
                      onClick={() =>
                        updateResumeStatus(
                          item.application_id,
                          item.resume_id,
                          action.value
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm border
                        ${
                          isUpdating || item.status === action.value
                            ? "opacity-50 cursor-not-allowed"
                            : action.color
                        }`}
                    >
                      {isUpdating ? "Updating..." : action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {filteredResumes.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No {activeTab.toLowerCase()} found
          </p>
        )}
      </div>
    </div>
  );
};
