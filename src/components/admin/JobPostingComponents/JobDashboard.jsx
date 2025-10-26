import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const draftJobs = [
  {
    id: 101,
    title: "Draft - Marketing Executive",
    location: "Delhi",
    tag: "Draft",
    totalResponses: 0,
    newResponses: 0,
    shortlisted: 0,
    postedBy: "Me",
    date: "25 Aug 2025",
  },
  {
    id: 102,
    title: "Draft - HR Manager",
    location: "Mumbai",
    tag: "Draft",
    totalResponses: 0,
    newResponses: 0,
    shortlisted: 0,
    postedBy: "Me",
    date: "24 Aug 2025",
  },
];

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between bg-white rounded-lg border border-gray-200 shadow p-4 mb-3 hover:shadow-md transition">
      {/* Left */}
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-2" />
        <div>
          <h2 className="font-semibold text-gray-800">{job.title}</h2>
          <p className="text-sm text-gray-500">{job.location}</p>
          <span className="inline-block text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded mt-1">
            {job.tag}
          </span>
        </div>
      </div>

      {/* Middle */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="text-blue-600 font-bold">
            {job.totalResponses}{" "}
            {job.newResponses > 0 && (
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">
                {job.newResponses} New
              </span>
            )}
          </p>
          <p className="text-xs text-gray-500">Total Responses</p>
        </div>
        <div className="text-center">
          <p className="text-gray-800 font-bold">{job.shortlisted}</p>
          <p className="text-xs text-gray-500">Shortlisted</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 text-gray-500">
        <FiRefreshCw className="cursor-pointer" />
        <MdEdit
          className="cursor-pointer"
          onClick={() => navigate(`/jobposting/jobs/${job.id}`)}
        />
        <BsThreeDotsVertical className="cursor-pointer" />
        <div className="text-xs text-gray-400">
          <p>
            posted by {job.postedBy} | {job.date}
          </p>
        </div>
      </div>
    </div>
  );
};

// ✅ JobDashboard Component with API integration
const JobDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://147.93.72.227:5000/jobs/list-all-jobs");
        const data = await res.json();
        // Adjust below based on actual response structure
        if (data && Array.isArray(data.jobs)) {
          setAllJobs(
            data.jobs.map((job) => ({
              id: job._id || job.id,
              title: job.title || "Untitled Job",
              location: job.location || "Not specified",
              tag: job.tag || "Active",
              totalResponses: job.totalResponses || 0,
              newResponses: job.newResponses || 0,
              shortlisted: job.shortlisted || 0,
              postedBy: job.postedBy || "Unknown",
              date: job.date
                ? new Date(job.date).toLocaleDateString()
                : "N/A",
            }))
          );
        } else {
          setAllJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setAllJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const jobsToShow = activeTab === "all" ? allJobs : draftJobs;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b pb-2 mb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`font-semibold pb-1 ${
            activeTab === "all"
              ? "border-b-2 border-red-500 text-gray-800"
              : "text-gray-500"
          }`}
        >
          All Jobs {allJobs.length}
        </button>
        <button
          onClick={() => setActiveTab("drafts")}
          className={`font-semibold pb-1 ${
            activeTab === "drafts"
              ? "border-b-2 border-red-500 text-gray-800"
              : "text-gray-500"
          }`}
        >
          Drafts {draftJobs.length}
        </button>
      </div>

      {/* Loading / Empty / Jobs */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading jobs...</p>
      ) : jobsToShow.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs found.</p>
      ) : (
        jobsToShow.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </div>
  );
};

export default JobDashboard;
