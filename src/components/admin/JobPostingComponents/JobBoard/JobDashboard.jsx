import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div className="flex items-start justify-between bg-white rounded-lg border border-gray-200 shadow p-4 mb-3 hover:shadow-md transition">
      {/* Left */}
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-2" />
        <div>
          <h2 className="font-semibold text-gray-800">
            {job?.jobTitle || "NA"}
          </h2>
          <p className="text-sm text-gray-500">{job?.location}</p>

          {job?.Status && (
            <span className="inline-block text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded mt-1">
              {job?.Status}
            </span>
          )}
        </div>
      </div>

      {/* Middle (Only for Job) */}
      {job?.totalResponses !== undefined && (
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-blue-600 font-bold">{job.totalResponses || 0}</p>
            <p className="text-xs text-gray-500">Total Responses</p>
          </div>
          <div className="text-center">
            <p className="text-gray-800 font-bold">{job.shortlisted || 0}</p>
            <p className="text-xs text-gray-500">Shortlisted</p>
          </div>
        </div>
      )}

      {/* Right */}
      <div className="flex items-center gap-4 text-gray-500">
        <FiRefreshCw className="cursor-pointer" />
        <MdEdit
          className="cursor-pointer"
          onClick={() => navigate(`/jobposting/jobs/${job.job_id}`)}
        />

        {job?.job_id && (
          <MdDelete
            className="cursor-pointer text-red-500 hover:text-red-600"
            onClick={() => handleDelete(job.job_id)}
          />
        )}

        <BsThreeDotsVertical className="cursor-pointer" />
        <div className="text-xs text-gray-400">
          <p>
            Posted on:{" "}
            {new Date(job?.created_at || job?.createdAt).toLocaleDateString(
              "en-GB"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const JobDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [allJobs, setAllJobs] = useState([]);
  const [draftJobs, setDraftJobs] = useState([]);

  const [internshipsActive, setInternshipsActive] = useState([]);
  const [internshipsDraft, setInternshipsDraft] = useState([]);

  const [loading, setLoading] = useState(true);

  

// ✅ Fetch JOBS
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

    const data = await res.json();
    console.log("Jobs data: ", data);

    if (data?.AllJobs && Array.isArray(data.AllJobs)) {
      const active = data.AllJobs.filter((job) => job.Status === "active");
      const drafts = data.AllJobs.filter(
        (job) => job.Status === "draft" || job.Status === "inactive"
      );

      setAllJobs(active);
      setDraftJobs(drafts);
    } else {
      setAllJobs([]);
      setDraftJobs([]);
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};



// ✅ Fetch INTERNSHIPS
const fetchInternships = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://147.93.72.227:5000/api/internship/all-internships",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("Internship data: ", data);

    if (data?.data && Array.isArray(data.data)) {
      const active = data.data.filter((job) => job.Status === "active");
      const drafts = data.data.filter(
        (job) => job.Status === "draft" || job.Status === "inactive"
      );

      setInternshipsActive(active);
      setInternshipsDraft(drafts);
    } else {
      setInternshipsActive([]);
      setInternshipsDraft([]);
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

  // ✅ Delete job from UI (only UI remove)
  const handleDeleteJob = (id) => {
    setAllJobs((prev) => prev.filter((job) => job.job_id !== id));
    setDraftJobs((prev) => prev.filter((job) => job.job_id !== id));
  };

  // ✅ TAB Content
  let jobsToShow = [];

  if (activeTab === "all") jobsToShow = allJobs;
  if (activeTab === "hot") jobsToShow = allJobs;
  if (activeTab === "internships") jobsToShow = internshipsActive;
  if (activeTab === "drafts") jobsToShow = draftJobs;
  if (activeTab === "internshipDraft") jobsToShow = internshipsDraft;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ✅ Tabs */}
      <div className="flex items-center gap-6 border-b pb-2 mb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`font-semibold pb-1 ${
            activeTab === "all"
              ? "border-b-2 border-red-500 text-gray-800"
              : "text-gray-500"
          }`}
        >
          All Jobs ({allJobs.length})
        </button>

        <button
          onClick={() => setActiveTab("hot")}
          className={`font-semibold pb-1 ${
            activeTab === "hot"
              ? "border-b-2 border-red-500 text-gray-800"
              : "text-gray-500"
          }`}
        >
          Hot Vacancy ({allJobs.length})
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

      {/* ✅ Loading / Empty / Cards */}
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
