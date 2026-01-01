import React, { useState, useEffect } from "react";

import { JobCard } from "./JobCard";



const JobDashboard = () => {
  const [activeTab, setActiveTab] = useState("hot");

  const [allJobs, setAllJobs] = useState([]);
  const [hotJobs, setHotJobs] = useState([]);
  const [draftJobs, setDraftJobs] = useState([]);

  const [internshipsActive, setInternshipsActive] = useState([]);
  const [internshipsDraft, setInternshipsDraft] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://147.93.72.227:5000/api/jobs/employer-jobs",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data1 = await res.json();
      console.log("Jobs data:", data1?.jobs);

      if (Array.isArray(data1?.jobs)) {
        const active = data1.jobs.filter(
          (job) => job.Status === "active"
        );

        const drafts = data1.jobs.filter(
          (job) => job.Status === "draft" || job.Status === "inactive"
        );

        const hotVacancy = active.filter(
          (job) => job.category === "HotVacancy"
        );

        setAllJobs(active);
        setDraftJobs(drafts);
        setHotJobs(hotVacancy);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // ================= FETCH INTERNSHIPS =================
  const fetchInternships = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://147.93.72.227:5000/api/internship/employer-internships",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data?.jobs)) {
        setInternshipsActive(
          data.jobs.filter((job) => job.Status === "active")
        );

        setInternshipsDraft(
          data.jobs.filter(
            (job) => job.Status === "draft" || job.Status === "inactive"
          )
        );
      }
    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchJobs(), fetchInternships()]);
      setLoading(false);
    };
    load();
  }, []);

  // ================= DELETE API =================
  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://147.93.72.227/api/jobs/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // ✅ Remove from UI after successful delete
      setAllJobs((prev) => prev.filter((job) => job.job_id !== id));
      setHotJobs((prev) => prev.filter((job) => job.job_id !== id));
      setDraftJobs((prev) => prev.filter((job) => job.job_id !== id));
      setInternshipsActive((prev) =>
        prev.filter((job) => job.job_id !== id)
      );
      setInternshipsDraft((prev) =>
        prev.filter((job) => job.job_id !== id)
      );

      console.log("Job deleted successfully:", id);
    } catch (error) {
      console.error("Delete job error:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  // ================= TAB DATA =================
  let jobsToShow = [];
  if (activeTab === "hot") jobsToShow = hotJobs;
  if (activeTab === "internships") jobsToShow = internshipsActive;
  if (activeTab === "drafts") jobsToShow = draftJobs;
  if (activeTab === "internshipDraft") jobsToShow = internshipsDraft;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-6 border-b pb-2 mb-4">
        <button
          onClick={() => setActiveTab("hot")}
          className={`font-semibold pb-1 ${
            activeTab === "hot"
              ? "border-b-2 border-red-500 text-gray-800"
              : "text-gray-500"
          }`}
        >
          Hot Vacancy ({hotJobs.length})
        </button>

        <button
          onClick={() => setActiveTab("internships")}
          className={`font-semibold pb-1 ${
            activeTab === "internships"
              ? "border-b-2 border-red-500 text-gray-800"
              : "text-gray-500"
          }`}
        >
          Internships ({internshipsActive.length})
        </button>

        <button
          onClick={() => setActiveTab("drafts")}
          className={`font-semibold pb-1 ${
            activeTab === "drafts"
              ? "border-b-2 border-red-500 text-gray-800"
              : "text-gray-500"
          }`}
        >
          Drafts HotVacancy ({draftJobs.length})
        </button>

        <button
          onClick={() => setActiveTab("internshipDraft")}
          className={`font-semibold pb-1 ${
            activeTab === "internshipDraft"
              ? "border-b-2 border-red-500 text-gray-800"
              : "text-gray-500"
          }`}
        >
          Internships Draft ({internshipsDraft.length})
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : jobsToShow.length === 0 ? (
        <p className="text-gray-500 text-center">No records found.</p>
      ) : (
        jobsToShow.map((job) => (
          <JobCard
            key={job._id || job.job_id}
            job={job}
            onDelete={handleDeleteJob}
          />
        ))
      )}
    </div>
  );
};

export default JobDashboard;
