import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const initialAllJobs = [
  {
    id: 1,
    title: "Urgent Hiring II Technical Retail Associate",
    location: "Bengaluru",
    tag: "Hot Vacancy",
    totalResponses: 40,
    newResponses: 4,
    shortlisted: 0,
    postedBy: "Me",
    date: "26 Aug 2025",
  },
  {
    id: 2,
    title: "Urgent Hiring- Telesales Associates II Bengaluru",
    location: "Bengaluru",
    tag: "Invite",
    totalResponses: 60,
    newResponses: 7,
    shortlisted: 0,
    postedBy: "Me",
    date: "26 Aug 2025",
  },
  {
    id: 3,
    title: "Urgent Hiring I Evaluation Engineer I Bengaluru",
    location: "Bengaluru",
    tag: "Invite",
    totalResponses: 261,
    newResponses: 80,
    shortlisted: 0,
    postedBy: "Me",
    date: "26 Aug 2025",
  },
  {
    id: 4,
    title: "Dealer Success Manager II CARS24",
    location: "Ahmedabad +2",
    tag: "Invite",
    totalResponses: 80,
    newResponses: 57,
    shortlisted: 2,
    postedBy: "vikran",
    date: "25 Aug 2025",
  },
  {
    id: 5,
    title: "Zonal Manager / Team Lead - Sales II CARS24",
    location: "Faridabad +1",
    tag: "Invite",
    totalResponses: 412,
    newResponses: 196,
    shortlisted: 63,
    postedBy: "vikran",
    date: "25 Aug 2025",
  },
];

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

// JobDashboard Component
const JobDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  // ✅ Use the arrays you defined above
  const jobsToShow = activeTab === "all" ? initialAllJobs : draftJobs;

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
          All Jobs {initialAllJobs.length}
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

      {/* Job List */}
      {jobsToShow.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobDashboard;
